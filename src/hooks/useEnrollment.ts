'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/Toast';
import { useAuth } from '@/contexts';
import { enrollCourse } from '@/services/course';
import { translateError } from '@/constants/auth';
import { ROUTES } from '@/constants/navigation';
import { 
  getAvailableWallets, 
  sendPayment,
  type CardanoWallet,
} from '@/constants/wallet';
import { ENROLL_DIALOG, ENROLLMENT_CONFIG } from '@/components/courses/course-detail/constants';
import type { Course, CoursePaymentMethod } from '@/types/course';
import type { EnrollmentState, UseEnrollmentReturn } from '@/components/courses/course-detail/types';

interface UseEnrollmentProps {
  course: Course;
  courseSlug: string;
  discountedPrice: number;
}

interface ExtendedEnrollmentState extends EnrollmentState {
  isFaceCaptureOpen: boolean;
  capturedFaceImage: string | null;
  pendingWallet: CardanoWallet | null;
}

const INITIAL_STATE: ExtendedEnrollmentState = {
  isDialogOpen: false,
  isWalletModalOpen: false,
  isProcessing: false,
  isFaceCaptureOpen: false,
  capturedFaceImage: null,
  pendingWallet: null,
};

const findCardanoPaymentMethod = (methods?: CoursePaymentMethod[]): CoursePaymentMethod | undefined => 
  methods?.find(pm => pm.paymentMethod?.name === ENROLLMENT_CONFIG.cardanoPaymentMethodName);

const extractErrorMessage = (err: unknown, fallback: string): string => 
  err instanceof Error ? err.message : fallback;

export function useEnrollment({ course, courseSlug, discountedPrice }: UseEnrollmentProps): UseEnrollmentReturn {
  const router = useRouter();
  const toast = useToast();
  const { user, isAuthenticated } = useAuth();

  const [state, setState] = useState<ExtendedEnrollmentState>(INITIAL_STATE);
  const [wallets, setWallets] = useState<CardanoWallet[]>([]);

  const isFree = course.price === 0;
  const cardanoPaymentMethod = useMemo(
    () => findCardanoPaymentMethod(course.coursePaymentMethods), 
    [course.coursePaymentMethods]
  );

  useEffect(() => {
    setWallets(getAvailableWallets());
  }, []);

  const updateState = useCallback((updates: Partial<ExtendedEnrollmentState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const navigateToLearn = useCallback(() => {
    window.location.href = `${ROUTES.COURSES}/${courseSlug}/learn`;
  }, [courseSlug]);

  const handleEnrollClick = useCallback(() => {
    if (!isAuthenticated) {
      toast.error(ENROLL_DIALOG.loginRequired);
      router.push(ROUTES.LOGIN);
      return;
    }
    updateState({ isDialogOpen: true });
  }, [isAuthenticated, router, toast, updateState]);

  const enrollFreeUser = useCallback(async () => {
    if (!user?.id) return;
    
    updateState({ isProcessing: true });
    let success = false;
    
    try {
      await enrollCourse({ userId: user.id, courseId: course.id });
      success = true;
      toast.success(ENROLL_DIALOG.success);
      navigateToLearn();
    } catch (err) {
      toast.error(translateError(extractErrorMessage(err, ENROLL_DIALOG.enrollFailed)));
    } finally {
      if (!success) {
        updateState({ isProcessing: false });
      }
    }
  }, [user?.id, course.id, toast, navigateToLearn, updateState]);

  const openWalletModal = useCallback(() => {
    if (wallets.length === 0) {
      toast.error(ENROLL_DIALOG.noWallet);
      return;
    }
    setTimeout(
      () => updateState({ isWalletModalOpen: true }), 
      ENROLLMENT_CONFIG.walletModalDelay
    );
  }, [wallets.length, toast, updateState]);

  const handleConfirmEnroll = useCallback(async () => {
    if (!user?.id) return;
    
    updateState({ isDialogOpen: false });
    
    if (isFree) {
      await enrollFreeUser();
    } else {
      openWalletModal();
    }
  }, [user?.id, isFree, enrollFreeUser, openWalletModal, updateState]);

  const handleWalletSelect = useCallback((wallet: CardanoWallet) => {
    if (!user?.id || !cardanoPaymentMethod) return;
    
    updateState({ 
      isWalletModalOpen: false, 
      isFaceCaptureOpen: true,
      pendingWallet: wallet,
    });
  }, [user?.id, cardanoPaymentMethod, updateState]);

  const processPaymentWithFace = useCallback(async (faceImage: string) => {
    const wallet = state.pendingWallet;
    if (!user?.id || !cardanoPaymentMethod || !wallet) return;
    
    updateState({ isFaceCaptureOpen: false, isProcessing: true, capturedFaceImage: faceImage });
    
    let success = false;
    
    try {
      toast.info('Đang xác minh khuôn mặt...');
      
      const { faceService } = await import('@/services/face');
      const validateResult = await faceService.validate({ imageBase64: faceImage });
      
      if (!validateResult.success) {
        throw new Error(validateResult.message || 'Xác minh khuôn mặt thất bại');
      }
      
      const faceEmbedding = validateResult.message;
      
      toast.info('Đang xử lý thanh toán...');

      const { txHash, senderAddress } = await sendPayment(
        wallet.key,
        cardanoPaymentMethod.receiverAddress,
        discountedPrice
      );

      toast.info('Đang xác nhận với server...');

      const enrollmentResponse = await enrollCourse({
        userId: user.id,
        courseId: course.id,
        senderAddress,
        coursePaymentMethodId: cardanoPaymentMethod.id,
        priceAda: discountedPrice,
        txHash,
        faceEmbedding,
      });

      if (!enrollmentResponse.id) {
        throw new Error('Enrollment ID không tồn tại');
      }

      success = true;
      toast.success(ENROLL_DIALOG.success);
      navigateToLearn();
    } catch (err) {
      const errorMsg = extractErrorMessage(err, ENROLL_DIALOG.paymentFailed);
      toast.error(translateError(errorMsg));
    } finally {
      if (!success) {
        updateState({ isProcessing: false, capturedFaceImage: null, pendingWallet: null });
      }
    }
  }, [state.pendingWallet, user?.id, cardanoPaymentMethod, course.id, discountedPrice, toast, updateState, navigateToLearn]);

  const closeDialog = useCallback(() => updateState({ isDialogOpen: false }), [updateState]);
  const closeWalletModal = useCallback(() => updateState({ isWalletModalOpen: false }), [updateState]);
  const closeFaceCapture = useCallback(() => {
    updateState({ isFaceCaptureOpen: false, pendingWallet: null });
  }, [updateState]);

  return {
    state,
    wallets,
    handleEnrollClick,
    handleConfirmEnroll,
    handleWalletSelect,
    closeDialog,
    closeWalletModal,
    closeFaceCapture,
    processPaymentWithFace,
  };
}


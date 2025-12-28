'use client';

import { memo, useCallback, useEffect, useState, useMemo, createContext, useContext, type ReactNode } from 'react';
import { CheckCircleIcon, InfoIcon, CloseIcon, WarningIcon, ErrorCircleIcon } from './icons';
import type { ToastType, ToastItem, ToastContextValue, ToastItemProps } from './ui.types';
import { TOAST } from './ui.styles';

const TOAST_ICONS: Record<ToastType, React.FC<{ className?: string }>> = {
  success: CheckCircleIcon,
  error: ErrorCircleIcon,
  warning: WarningIcon,
  info: InfoIcon,
};

const generateId = (): string => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const ToastContext = createContext<ToastContextValue | null>(null);

const ToastItemComponent = memo(function ToastItemComponent({ toast, onClose }: ToastItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const startLeaveAnimation = useCallback(() => {
    setIsLeaving(true);
    setTimeout(onClose, TOAST.ANIMATION_DURATION);
  }, [onClose]);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  useEffect(() => {
    const duration = toast.duration || TOAST.DURATION;
    const timer = setTimeout(startLeaveAnimation, duration);
    return () => clearTimeout(timer);
  }, [toast.duration, startLeaveAnimation]);

  const { type } = toast;
  const Icon = TOAST_ICONS[type];
  const visibilityClass = isVisible && !isLeaving ? TOAST.ITEM_VISIBLE : TOAST.ITEM_HIDDEN;
  const itemDuration = toast.duration || TOAST.DURATION;

  return (
    <div className={`${TOAST.ITEM} ${TOAST.VARIANT[type]} ${visibilityClass}`}>
      <div className={TOAST.CONTENT}>
        <Icon className={`${TOAST.ICON} ${TOAST.ICON_COLOR[type]}`} />
        <p className={TOAST.MESSAGE}>{toast.message}</p>
        <button onClick={startLeaveAnimation} className={TOAST.CLOSE_BTN}>
          <CloseIcon className={TOAST.CLOSE_ICON} />
        </button>
      </div>
      <div
        className={`${TOAST.PROGRESS} ${TOAST.PROGRESS_COLOR[type]}`}
        style={{ animation: `shrink ${itemDuration}ms linear forwards` }}
      />
    </div>
  );
});

const ToastContainer = memo(function ToastContainer() {
  const context = useContext(ToastContext);
  if (!context?.toasts.length) return null;

  const { toasts, removeToast } = context;

  return (
    <div className={TOAST.CONTAINER}>
      {toasts.map(toast => (
        <div key={toast.id} className={TOAST.WRAPPER}>
          <ToastItemComponent toast={toast} onClose={() => removeToast(toast.id)} />
        </div>
      ))}
    </div>
  );
});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toastMap, setToastMap] = useState<Map<string, ToastItem>>(new Map());

  const toasts = useMemo(() => Array.from(toastMap.values()), [toastMap]);

  const addToast = useCallback((type: ToastType, message: string, duration?: number) => {
    const id = generateId();
    const newToast: ToastItem = { id, type, message, duration };
    setToastMap(prev => new Map(prev).set(id, newToast));
  }, []);

  const removeToast = useCallback((id: string) => {
    setToastMap(prev => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const contextValue = useMemo<ToastContextValue>(
    () => ({ toasts, addToast, removeToast }),
    [toasts, addToast, removeToast]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer />
      <style jsx global>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error(TOAST.ERROR_MSG);

  const { addToast } = context;

  return useMemo(() => ({
    success: (message: string, duration?: number) => addToast('success', message, duration),
    error: (message: string, duration?: number) => addToast('error', message, duration),
    warning: (message: string, duration?: number) => addToast('warning', message, duration),
    info: (message: string, duration?: number) => addToast('info', message, duration),
  }), [addToast]);
}

export const Toast = {
  Provider: ToastProvider,
  useToast,
};

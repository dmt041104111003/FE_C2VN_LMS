'use client';

import { memo, useState, useCallback, useEffect } from 'react';
import { Input, Button, Textarea, useToast, SmartphoneIcon } from '@/components/ui';
import { DEMO } from '@/constants';
import { useAuth } from '@/hooks';
import { DEMO_SECTION, DEMO_CONTAINER, DEMO_TITLE, DEMO_DESC } from './landing.styles';
import { submitContactMessage } from '@/services/contact';

const LABELS = {
  from: 'Gửi từ:',
  name: 'Họ tên:',
  sendSuccess: 'Gửi tin nhắn thành công!',
  sendError: 'Không thể gửi tin nhắn. Vui lòng thử lại.',
  sending: 'Đang gửi...',
} as const;

const SectionHeader = memo(() => (
  <div className="text-center mb-4 md:mb-6">
    <h2 className={DEMO_TITLE}>{DEMO.title}</h2>
    <p className={DEMO_DESC}>{DEMO.description}</p>
  </div>
));

SectionHeader.displayName = 'SectionHeader';

function DemoComponent() {
  const toast = useToast();
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState<'initial' | 'form' | 'done'>('initial');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userEmail = user?.email || user?.walletAddress || '';
  const userName = user?.fullName || '';
  const isContentValid = content.trim().length >= 10;

  useEffect(() => {
    setStep('initial');
    setContent('');
  }, [user?.id]);

  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isContentValid || isSubmitting || !userEmail) return;

    setIsSubmitting(true);
    try {
      await submitContactMessage({ email: userEmail, content });
      toast.success(LABELS.sendSuccess);
      setStep('done');
      setContent('');
      setTimeout(() => setStep('initial'), 3000);
    } catch {
      toast.error(LABELS.sendError);
    } finally {
      setIsSubmitting(false);
    }
  }, [userEmail, content, isContentValid, isSubmitting, toast]);

  const handleImageClick = useCallback(() => {
    if (!isAuthenticated) {
      window.location.href = '/auth/login';
    } else {
      setStep('form');
    }
  }, [isAuthenticated]);

  if (step === 'initial') {
    return (
      <section className={DEMO_SECTION}>
        <div className={DEMO_CONTAINER + " flex flex-col items-center"}>
          <SectionHeader />
          <button onClick={handleImageClick} className="cursor-pointer">
            <img src="/1.png" alt="Góp ý" className="max-w-3xl w-full h-auto" />
          </button>
        </div>
      </section>
    );
  }

  if (step === 'done') {
    return (
      <section className={DEMO_SECTION}>
        <div className={DEMO_CONTAINER + " flex flex-col items-center"}>
          <SectionHeader />
          <img src="/2.png" alt="Cảm ơn" className="max-w-3xl w-full h-auto" />
        </div>
      </section>
    );
  }

  return (
    <section className={DEMO_SECTION}>
      <div className={DEMO_CONTAINER + " flex flex-col items-center px-4"}>
        <SectionHeader />
        
        <div className="sm:hidden max-sm:landscape:hidden flex flex-col items-center justify-center gap-4 py-12">
          <SmartphoneIcon className="w-16 h-16 text-[var(--primary)] animate-[rotate-hint_2s_ease-in-out_infinite]" />
          <p className="text-sm text-[var(--text)]/70 text-center">
            Vui lòng xoay ngang điện thoại<br/>để gửi góp ý
          </p>
        </div>

        <div
          className="hidden sm:block max-sm:landscape:block relative max-w-3xl w-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] max-sm:landscape:min-h-[220px]"
          style={{
            backgroundImage: 'url(/3.png)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px] md:min-h-[500px] max-sm:landscape:min-h-[220px] p-4 sm:p-6 lg:p-8 max-sm:landscape:p-2">
            <div className="w-full max-w-[280px] xs:max-w-xs sm:max-w-md md:max-w-lg max-sm:landscape:max-w-md p-2 sm:p-4 md:p-6 -rotate-1 sm:-rotate-2 max-sm:landscape:rotate-0">
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5 max-sm:landscape:space-y-1.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 max-sm:landscape:grid-cols-2 gap-3 sm:gap-4 md:gap-6 max-sm:landscape:gap-2">
                  <div>
                    <label className="block text-xs text-[var(--text)]/60 mb-1 max-sm:landscape:mb-0.5">{LABELS.name}</label>
                    <Input type="text" value={userName} variant="minimal" size="sm" disabled className="!bg-transparent !border-none !px-0" />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text)]/60 mb-1 max-sm:landscape:mb-0.5">{LABELS.from}</label>
                    <Input type="text" value={userEmail} variant="minimal" size="sm" disabled className="!bg-transparent !border-none !px-0" />
                  </div>
                </div>

                <Textarea
                  placeholder={DEMO.contentPlaceholder}
                  value={content}
                  onChange={handleContentChange}
                  rows={4}
                  variant="minimal"
                  size="sm"
                  className="!bg-transparent !border-none !px-0 sm:!min-h-[100px] md:!min-h-[120px] max-sm:landscape:!min-h-[50px]"
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={!isContentValid || isSubmitting}
                  className="w-full max-sm:landscape:!py-1.5"
                >
                  {isSubmitting ? LABELS.sending : DEMO.submitText}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const Demo = memo(DemoComponent);

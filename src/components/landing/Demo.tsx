'use client';

import { memo, useState, useCallback, useEffect } from 'react';
import { Input, Button, Textarea, useToast } from '@/components/ui';
import { DEMO } from '@/constants';
import { useAuth } from '@/hooks';
import { DEMO_SECTION } from './landing.styles';
import { submitContactMessage } from '@/services/contact';

const LABELS = {
  from: 'Gửi từ:',
  name: 'Họ tên:',
  sendSuccess: 'Gửi tin nhắn thành công!',
  sendError: 'Không thể gửi tin nhắn. Vui lòng thử lại.',
  sending: 'Đang gửi...',
} as const;

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
      <section className="w-full py-12 flex items-center justify-center">
        <button onClick={handleImageClick} className="cursor-pointer">
          <img src="/1.png" alt="Góp ý" className="max-w-3xl w-full h-auto" />
        </button>
      </section>
    );
  }

  if (step === 'done') {
    return (
      <section className="w-full py-12 flex items-center justify-center">
        <img src="/2.png" alt="Cảm ơn" className="max-w-3xl w-full h-auto" />
      </section>
    );
  }

  return (
    <section className="w-full py-12 flex items-center justify-center">
      <div 
        className="relative max-w-3xl w-full min-h-[500px]"
        style={{
          backgroundImage: 'url(/3.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="flex items-center justify-center min-h-[500px] p-6">
            <div className="w-full max-w-md bg-[var(--card)] rounded-xl p-6" style={{ transform: 'rotate(-2deg)' }}>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[var(--text)]/60 mb-1">{LABELS.name}</label>
                    <Input type="text" value={userName} variant="minimal" size="sm" disabled />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--text)]/60 mb-1">{LABELS.from}</label>
                    <Input type="text" value={userEmail} variant="minimal" size="sm" disabled />
                  </div>
                </div>

                <Textarea
                  placeholder={DEMO.contentPlaceholder}
                  value={content}
                  onChange={handleContentChange}
                  rows={3}
                  variant="minimal"
                  size="sm"
                />

                <Button 
                  type="submit" 
                  variant="primary"
                  size="md"
                  disabled={!isContentValid || isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? LABELS.sending : DEMO.submitText}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
  );
}

export const Demo = memo(DemoComponent);

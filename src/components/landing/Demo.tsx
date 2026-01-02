'use client';

import { memo, useState, useCallback, useEffect } from 'react';
import { Input, Button, Textarea, useToast } from '@/components/ui';
import { DEMO } from '@/constants';
import { useAuth } from '@/hooks';
import {
  DEMO_SECTION,
  DEMO_CONTAINER,
  DEMO_CARD,
  DEMO_SUBTITLE,
  DEMO_TITLE,
  DEMO_DESC,
  DEMO_FORM,
} from './landing.styles';
import { DEMO_FORM_FIELD } from '@/components/ui/ui.styles';
import { submitContactMessage } from '@/services/contact';

const LABELS = {
  loginButton: 'Đăng nhập',
  from: 'Gửi từ:',
  name: 'Họ tên:',
  sendSuccess: 'Gửi tin nhắn thành công! Cảm ơn bạn đã liên hệ.',
  sendError: 'Không thể gửi tin nhắn. Vui lòng thử lại.',
  sending: 'Đang gửi...',
  thankYou: 'Cảm ơn bạn đã liên hệ!',
  willReply: 'Chúng tôi sẽ phản hồi sớm nhất có thể.',
} as const;

function DemoComponent() {
  const toast = useToast();
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState<'form' | 'done'>('form');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const userEmail = user?.email || user?.walletAddress || '';
  const userName = user?.fullName || '';
  const isContentValid = content.trim().length >= 10;

  
  useEffect(() => {
    setStep('form');
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
      
      setTimeout(() => setStep('form'), 3000);
    } catch {
      toast.error(LABELS.sendError);
    } finally {
      setIsSubmitting(false);
    }
  }, [userEmail, content, isContentValid, isSubmitting, toast]);

  const handleLoginClick = useCallback(() => {
    
    window.location.href = '/auth/login';
  }, []);

  return (
    <section className={DEMO_SECTION}>
      <div className={DEMO_CONTAINER}>
        <div className={DEMO_CARD}>
          <p className={DEMO_SUBTITLE}>{DEMO.subtitle}</p>
          <h2 className={DEMO_TITLE}>{DEMO.title}</h2>
          <p className={DEMO_DESC}>{DEMO.description}</p>

          {!isAuthenticated ? (
            
            <div className="py-4">
              <Button variant="primary" size="lg" onClick={handleLoginClick} className="w-full">
                {LABELS.loginButton}
              </Button>
            </div>
          ) : step === 'form' ? (
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[var(--text)]/60 mb-2">{LABELS.name}</label>
                  <Input
                    type="text"
                    value={userName}
                    variant="minimal"
                    size="md"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text)]/60 mb-2">{LABELS.from}</label>
                  <Input
                    type="text"
                    value={userEmail}
                    variant="minimal"
                    size="md"
                    disabled
                  />
                </div>
              </div>

              {}
              <div>
                <Textarea
                  placeholder={DEMO.contentPlaceholder}
                  value={content}
                  onChange={handleContentChange}
                  rows={4}
                  variant="minimal"
                  size="md"
                />
              </div>

              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  variant="primary"
                  size="lg"
                  disabled={!isContentValid || isSubmitting}
                >
                  {isSubmitting ? LABELS.sending : DEMO.submitText}
                </Button>
              </div>
            </form>
          ) : (
            
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <svg 
                  className="w-16 h-16" 
                  viewBox="0 0 52 52"
                  fill="none"
                >
                  <circle 
                    cx="26" cy="26" r="24" 
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-[var(--accent)]/20"
                  />
                  <path 
                    d="M14 27l8 8 16-16" 
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[var(--accent)] check-animate"
                  />
                </svg>
              </div>
              <p className="text-lg font-medium text-[var(--text)]">{LABELS.thankYou}</p>
              <p className="text-[var(--text)]/60">{LABELS.willReply}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export const Demo = memo(DemoComponent);

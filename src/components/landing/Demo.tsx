'use client';

import { memo, useState, useCallback } from 'react';
import { Input, Button, Form } from '@/components/ui';
import { DEMO, FEEDBACK_FIELDS, validateEmail } from '@/constants';
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
import { AUTH_FORM_LABEL } from '@/components/auth/auth.styles';

function DemoComponent() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [email, setEmail] = useState('');

  const isEmailValid = validateEmail(email);

  const handleRegisterClick = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid) return;
    setShowFeedback(true);
  }, [isEmailValid]);

  const handleFeedbackSubmit = useCallback(() => {
    setShowFeedback(false);
    setEmail('');
  }, []);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  return (
    <section className={DEMO_SECTION}>
      <div className={DEMO_CONTAINER}>
        <div className={DEMO_CARD}>
          <p className={DEMO_SUBTITLE}>{DEMO.subtitle}</p>
          <h2 className={DEMO_TITLE}>{DEMO.title}</h2>
          <p className={DEMO_DESC}>{DEMO.description}</p>

          {!showFeedback ? (
            <form className={DEMO_FORM} onSubmit={handleRegisterClick}>
              <div className={DEMO_FORM_FIELD}>
                <Input
                  type="email"
                  placeholder={DEMO.placeholder}
                  variant="minimal"
                  size="lg"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              {isEmailValid && (
                <Button type="submit" variant="primary" size="lg">
                  {DEMO.cta}
                </Button>
              )}
            </form>
          ) : (
            <Form
              fields={FEEDBACK_FIELDS}
              textareaPlaceholder={DEMO.contentPlaceholder}
              submitText={DEMO.submitText}
              minContentLength={10}
              onSubmit={handleFeedbackSubmit}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export const Demo = memo(DemoComponent);

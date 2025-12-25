'use client';

import { memo, useState } from 'react';
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

function DemoComponent() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [email, setEmail] = useState('');

  const isEmailValid = validateEmail(email);

  const handleRegisterClick = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEmailValid) return;

    setShowFeedback(true);
  };

  const handleFeedbackSubmit = () => {
    setShowFeedback(false);
    setEmail('');
  };

  return (
    <section className={DEMO_SECTION}>
      <div className={DEMO_CONTAINER}>
        <div className={DEMO_CARD}>
          <p className={DEMO_SUBTITLE}>
            {DEMO.subtitle}
          </p>
          <h2 className={DEMO_TITLE}>
            {DEMO.title}
          </h2>
          <p className={DEMO_DESC}>
            {DEMO.description}
          </p>

          {!showFeedback ? (
            <form
              className={DEMO_FORM}
              onSubmit={handleRegisterClick}
            >
              <div className="flex-1 space-y-1">
                <label className="text-xs text-[var(--text)]/40 uppercase tracking-wider">Email</label>
                <Input
                  type="email"
                  placeholder={DEMO.placeholder}
                  variant="minimal"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {isEmailValid && (
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                >
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


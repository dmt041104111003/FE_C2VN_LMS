'use client';

import { memo, useCallback, useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { CheckCircleIcon, InfoIcon, CloseIcon, WarningIcon, ErrorCircleIcon } from './icons';
import type { ToastType, ToastItem, ToastContextValue, ToastItemProps } from './ui.types';
import { TOAST, TOAST_VARIANT, TOAST_ICON_COLOR, TOAST_PROGRESS_COLOR } from './ui.styles';

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_ICONS: Record<ToastType, React.FC<{ className?: string }>> = {
  success: CheckCircleIcon,
  error: ErrorCircleIcon,
  warning: WarningIcon,
  info: InfoIcon,
};

const ToastItemComponent = memo(function ToastItemComponent({ toast, onClose }: ToastItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  useEffect(() => {
    const duration = toast.duration || TOAST.DURATION;
    const timer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [toast.duration, onClose]);

  const handleClose = useCallback(() => {
    setIsLeaving(true);
    setTimeout(onClose, 300);
  }, [onClose]);

  const Icon = TOAST_ICONS[toast.type];
  const visibilityClass = isVisible && !isLeaving ? TOAST.ITEM_VISIBLE : TOAST.ITEM_HIDDEN;

  return (
    <div className={`${TOAST.ITEM} ${TOAST_VARIANT[toast.type]} ${visibilityClass}`}>
      <div className={TOAST.CONTENT}>
        <Icon className={`${TOAST.ICON} ${TOAST_ICON_COLOR[toast.type]}`} />
        <p className={TOAST.MESSAGE}>{toast.message}</p>
        <button onClick={handleClose} className={TOAST.CLOSE_BTN}>
          <CloseIcon className={TOAST.CLOSE_ICON} />
        </button>
      </div>
      <div
        className={`${TOAST.PROGRESS} ${TOAST_PROGRESS_COLOR[toast.type]}`}
        style={{ animation: `shrink ${toast.duration || TOAST.DURATION}ms linear forwards` }}
      />
    </div>
  );
});

const ToastContainer = memo(function ToastContainer() {
  const context = useContext(ToastContext);
  if (!context) return null;

  const { toasts, removeToast } = context;
  if (toasts.length === 0) return null;

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
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((type: ToastType, message: string, duration?: number) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    setToasts(prev => [...prev, { id, type, message, duration }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
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
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const { addToast } = context;

  return {
    success: (message: string, duration?: number) => addToast('success', message, duration),
    error: (message: string, duration?: number) => addToast('error', message, duration),
    warning: (message: string, duration?: number) => addToast('warning', message, duration),
    info: (message: string, duration?: number) => addToast('info', message, duration),
  };
}

export const Toast = {
  Provider: ToastProvider,
  useToast,
};

'use client';

import { memo, useEffect } from 'react';
import { WalletModalProps } from './ui.types';
import { CloseIcon } from './icons';
import {
  MODAL_OVERLAY,
  MODAL_CONTAINER,
  CARD_MODAL_CLOSE,
  CARD_MODAL_CLOSE_ICON,
} from './ui.styles';

function WalletModalComponent({
  isOpen,
  wallets,
  emptyText,
  onClose,
  onSelect,
}: WalletModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={MODAL_OVERLAY} onClick={onClose}>
      <button
        className={CARD_MODAL_CLOSE}
        onClick={(e) => { e.stopPropagation(); onClose(); }}
      >
        <CloseIcon className={CARD_MODAL_CLOSE_ICON} />
      </button>

      <div
        className={MODAL_CONTAINER}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 flex flex-col gap-3">
          {wallets.length === 0 ? (
            <div className="py-12 text-center text-sm text-[var(--text)]/50">
              {emptyText}
            </div>
          ) : (
            wallets.map((wallet) => (
              <button
                key={wallet.key}
                onClick={() => onSelect(wallet)}
                className="flex items-center gap-3"
              >
                <div className="w-14 h-14 rounded-xl bg-[var(--bg-alt)] flex items-center justify-center flex-shrink-0">
                  <img
                    src={wallet.icon || '/loading.png'}
                    alt={wallet.name}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div className="flex-1 h-14 rounded-xl border border-[var(--text)]/10 bg-[var(--bg-alt)] flex items-center justify-center px-4">
                  <span className="text-sm font-semibold text-[var(--text)]">
                    {wallet.name}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export const WalletModal = memo(WalletModalComponent);

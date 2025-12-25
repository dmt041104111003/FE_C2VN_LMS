'use client';

import { memo, useEffect, useCallback } from 'react';
import { WalletModalProps } from './ui.types';
import { CloseIcon } from './icons';
import {
  MODAL_OVERLAY,
  MODAL_CONTAINER,
  CARD_MODAL_CLOSE,
  CARD_MODAL_CLOSE_ICON,
  WALLET_MODAL_LIST,
  WALLET_MODAL_EMPTY,
  WALLET_MODAL_ITEM,
  WALLET_MODAL_ICON_WRAPPER,
  WALLET_MODAL_ICON,
  WALLET_MODAL_NAME_WRAPPER,
  WALLET_MODAL_NAME,
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

  const handleCloseClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  }, [onClose]);

  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  if (!isOpen) return null;

  return (
    <div className={MODAL_OVERLAY} onClick={onClose}>
      <button className={CARD_MODAL_CLOSE} onClick={handleCloseClick}>
        <CloseIcon className={CARD_MODAL_CLOSE_ICON} />
      </button>

      <div className={MODAL_CONTAINER} onClick={handleContainerClick}>
        <div className={WALLET_MODAL_LIST}>
          {wallets.length === 0 ? (
            <div className={WALLET_MODAL_EMPTY}>{emptyText}</div>
          ) : (
            wallets.map((wallet) => (
              <button
                key={wallet.key}
                onClick={() => onSelect(wallet)}
                className={WALLET_MODAL_ITEM}
              >
                <div className={WALLET_MODAL_ICON_WRAPPER}>
                  <img
                    src={wallet.icon || '/loading.png'}
                    alt={wallet.name}
                    className={WALLET_MODAL_ICON}
                  />
                </div>
                <div className={WALLET_MODAL_NAME_WRAPPER}>
                  <span className={WALLET_MODAL_NAME}>{wallet.name}</span>
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

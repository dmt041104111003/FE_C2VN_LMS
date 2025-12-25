'use client';

import { memo, useState, useEffect, useRef } from 'react';
import * as S from './editor.styles';
import { EDITOR_LABELS } from '@/constants';
import type { TipTapPreviewProps } from '@/types/editor';

function PreviewSkeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className={S.EDITOR.LOADING_BAR} />
      <div className={S.EDITOR.LOADING_BAR} />
      <div className={S.EDITOR.LOADING_BAR} />
      <div className={`${S.EDITOR.LOADING_BAR} w-3/4`} />
    </div>
  );
}

function TipTapPreviewComponent({ content, className = '' }: TipTapPreviewProps) {
  const [isClient, setIsClient] = useState(false);
  const proseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !proseRef.current) return;

    const addCopyButtons = () => {
      const prose = proseRef.current;
      if (!prose) return;

      prose.querySelectorAll('.code-copy-btn').forEach((btn) => btn.remove());

      prose.querySelectorAll('pre').forEach((pre) => {
        if (pre.querySelector('.code-copy-btn')) return;

        const codeBlock = pre.querySelector('code') || pre;

        const btn = document.createElement('button');
        btn.innerHTML = EDITOR_LABELS.copy;
        btn.className = `code-copy-btn ${S.PREVIEW.CODE_COPY_BTN}`;

        btn.onclick = async (e) => {
          e.stopPropagation();
          try {
            await navigator.clipboard.writeText(codeBlock.textContent || '');
            btn.innerHTML = EDITOR_LABELS.copied;
            setTimeout(() => {
              btn.innerHTML = EDITOR_LABELS.copy;
            }, 1500);
          } catch {}
        };

        pre.style.position = 'relative';
        pre.appendChild(btn);
      });
    };

    const timer = setTimeout(addCopyButtons, 50);
    return () => clearTimeout(timer);
  }, [content, isClient]);

  if (!isClient) {
    return <PreviewSkeleton className={className} />;
  }

  return (
    <>
      <div
        ref={proseRef}
        className={`ProseMirror ${S.PREVIEW.CONTAINER} ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <style jsx global>{`${S.PROSEMIRROR_STYLES}`}</style>
      <style jsx global>{`${S.TOOLTIP_STYLES}`}</style>
    </>
  );
}

export const TipTapPreview = memo(TipTapPreviewComponent);

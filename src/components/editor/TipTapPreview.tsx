'use client';

import { memo, useState, useEffect, useRef, useCallback } from 'react';
import * as S from './editor.styles';
import { EDITOR_LABELS } from '@/constants';
import type { TipTapPreviewProps } from '@/types/editor';

const PreviewSkeleton = memo(function PreviewSkeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className={S.EDITOR.LOADING_BAR} />
      <div className={S.EDITOR.LOADING_BAR} />
      <div className={S.EDITOR.LOADING_BAR} />
      <div className={`${S.EDITOR.LOADING_BAR} w-3/4`} />
    </div>
  );
});

function TipTapPreviewComponent({ content, className = '', compact = false }: TipTapPreviewProps) {
  const [isClient, setIsClient] = useState(false);
  const proseRef = useRef<HTMLDivElement>(null);
  const copyTimeoutRef = useRef<Map<HTMLElement, NodeJS.Timeout>>(new Map());

  useEffect(() => { setIsClient(true); }, []);

  const handleClick = useCallback(async (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains('code-copy-btn')) return;

    const pre = target.closest('pre');
    const code = pre?.querySelector('code') || pre;
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code.textContent || '');
      target.textContent = EDITOR_LABELS.copied;
      
      const existing = copyTimeoutRef.current.get(target);
      if (existing) clearTimeout(existing);
      
      const timeout = setTimeout(() => {
        target.textContent = EDITOR_LABELS.copy;
        copyTimeoutRef.current.delete(target);
      }, 1500);
      
      copyTimeoutRef.current.set(target, timeout);
    } catch {}
  }, []);

  useEffect(() => {
    const el = proseRef.current;
    if (!el || !isClient) return;

    el.addEventListener('click', handleClick);
    return () => {
      el.removeEventListener('click', handleClick);
      copyTimeoutRef.current.forEach(clearTimeout);
      copyTimeoutRef.current.clear();
    };
  }, [isClient, handleClick]);

  useEffect(() => {
    if (!isClient || !proseRef.current) return;

    const prose = proseRef.current;
    prose.querySelectorAll('pre').forEach((pre) => {
      if (pre.querySelector('.code-copy-btn')) return;
      
      const btn = document.createElement('button');
      btn.textContent = EDITOR_LABELS.copy;
      btn.className = `code-copy-btn ${S.PREVIEW.CODE_COPY_BTN}`;
      pre.style.position = 'relative';
      pre.appendChild(btn);
    });
  }, [content, isClient]);

  if (!isClient) return <PreviewSkeleton className={className} />;

  return (
    <>
      <div
        ref={proseRef}
        className={`ProseMirror ${compact ? '' : S.PREVIEW.CONTAINER} ${className}`}
        style={compact ? { minHeight: 'auto', padding: 0 } : undefined}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <style jsx global>{`${S.PROSEMIRROR_STYLES}`}</style>
      <style jsx global>{`${S.TOOLTIP_STYLES}`}</style>
    </>
  );
}

export const TipTapPreview = memo(TipTapPreviewComponent);

'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { Editor } from '@tiptap/react';
import type { SelectionInfo } from '@/types/editor';
import type { LockedRange, UseModalStateReturn, UseTooltipStateReturn } from '@/types/hooks';
import { getSelectionInfo, hasTooltipMark, rangesOverlap } from '@/constants';

export function useModalState(
  editor: Editor | null, 
  onSubmit: (url: string) => void
): UseModalStateReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => { setIsOpen(false); setUrl(''); }, []);
  const submit = useCallback(() => {
    if (!editor || !url.trim()) return;
    onSubmit(url);
    close();
  }, [editor, url, onSubmit, close]);

  return { isOpen, url, setUrl, open, close, submit };
}

export function useSelection(editor: Editor): SelectionInfo {
  const [selection, setSelection] = useState<SelectionInfo>(() => getSelectionInfo(editor));

  useEffect(() => {
    const update = () => setSelection(getSelectionInfo(editor));
    editor.on('selectionUpdate', update);
    return () => { editor.off('selectionUpdate', update); };
  }, [editor]);

  return selection;
}

export function useTooltipState(editor: Editor): UseTooltipStateReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [tooltipText, setTooltipText] = useState('');
  const [count, setCount] = useState(0);
  const lockedRangesRef = useRef<Map<string, LockedRange>>(new Map());

  const selection = useSelection(editor);
  const hasTooltip = useMemo(() => hasTooltipMark(editor), [editor.state.selection]);

  const isLocked = useCallback((text: string) => 
    lockedRangesRef.current.has(text), []);

  const hasOverlap = useCallback((from: number, to: number): boolean => {
    for (const range of lockedRangesRef.current.values()) {
      if (rangesOverlap([from, to], [range.from, range.to])) return true;
    }
    return false;
  }, []);

  const lock = useCallback((text: string, from: number, to: number) => {
    const ranges = lockedRangesRef.current;
    if (hasOverlap(from, to)) {
      const filtered = new Map<string, LockedRange>();
      for (const [key, range] of ranges) {
        if (!rangesOverlap([from, to], [range.from, range.to])) {
          filtered.set(key, range);
        }
      }
      filtered.set(text, { text, from, to });
      lockedRangesRef.current = filtered;
    } else {
      ranges.set(text, { text, from, to });
    }
    editor.chain().focus().setMark('lockMark').run();
  }, [editor, hasOverlap]);

  const unlock = useCallback((text: string, from: number, to: number) => {
    lockedRangesRef.current.delete(text);
    editor.chain().focus().setTextSelection({ from, to }).unsetMark('lockMark').run();
  }, [editor]);

  const addTooltip = useCallback((content: string) => {
    if (!content.trim() || !selection.hasSelection) return;
    editor.chain().focus().setTooltip({ tooltip: content.trim() }).run();
    unlock(selection.text, selection.from, selection.to);
    setTooltipText('');
    setIsOpen(false);
    setCount(c => c + 1);
  }, [editor, selection, unlock]);

  const removeTooltip = useCallback(() => {
    editor.chain().focus().unsetTooltip().run();
    unlock(selection.text, selection.from, selection.to);
    setIsOpen(false);
  }, [editor, selection, unlock]);

  const toggle = useCallback(() => {
    if (!selection.hasSelection || hasTooltip) return;
    
    const { text, from, to } = selection;
    if (isLocked(text)) {
      unlock(text, from, to);
    } else {
      lock(text, from, to);
      setIsOpen(true);
    }
  }, [selection, hasTooltip, isLocked, lock, unlock]);

  const close = useCallback(() => {
    setIsOpen(false);
    setTooltipText('');
  }, []);

  useEffect(() => {
    const handleDblClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('[data-tooltip]');
      if (el) {
        e.preventDefault();
        const text = el.getAttribute('data-tooltip');
        if (text) {
          setTooltipText(text);
          setIsOpen(true);
        }
      }
    };

    const dom = editor.view.dom;
    dom.addEventListener('dblclick', handleDblClick);
    return () => dom.removeEventListener('dblclick', handleDblClick);
  }, [editor]);

  useEffect(() => {
    if (lockedRangesRef.current.size === 0) return;
    
    const onUpdate = () => {
      const sel = getSelectionInfo(editor);
      if (sel.hasSelection && lockedRangesRef.current.has(sel.text)) {
        editor.commands.setTextSelection({ from: sel.from, to: sel.to });
      }
    };

    editor.on('selectionUpdate', onUpdate);
    return () => { editor.off('selectionUpdate', onUpdate); };
  }, [editor]);

  return {
    isOpen,
    tooltipText,
    setTooltipText,
    count,
    lockedCount: lockedRangesRef.current.size,
    selection,
    hasTooltip,
    isDisabled: !selection.hasSelection || hasTooltip,
    addTooltip,
    removeTooltip,
    toggle,
    close,
  };
}

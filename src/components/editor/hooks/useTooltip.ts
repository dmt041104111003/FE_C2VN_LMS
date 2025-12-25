'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { Editor } from '@tiptap/react';
import { getSelectionInfo, hasTooltipMark, rangesOverlap } from '@/constants';
import type { SelectionInfo } from '@/types/editor';

interface LockedRange {
  text: string;
  from: number;
  to: number;
}

export function useModalState(editor: Editor | null, onSubmit: (url: string) => void) {
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

export function useTooltipState(editor: Editor) {
  const [isOpen, setIsOpen] = useState(false);
  const [tooltipText, setTooltipText] = useState('');
  const [count, setCount] = useState(0);
  const lockedRangesRef = useRef<Map<string, LockedRange>>(new Map());

  const selection = useSelection(editor);
  const hasTooltip = useMemo(() => hasTooltipMark(editor), [editor.state.selection]);

  const isLocked = useCallback((text: string) => 
    lockedRangesRef.current.has(text), []);

  const hasOverlap = useCallback((from: number, to: number) => {
    for (const range of lockedRangesRef.current.values()) {
      if (rangesOverlap([from, to], [range.from, range.to])) return true;
    }
    return false;
  }, []);

  const lock = useCallback((text: string, from: number, to: number) => {
    if (hasOverlap(from, to)) {
      const newMap = new Map<string, LockedRange>();
      for (const [key, range] of lockedRangesRef.current) {
        if (!rangesOverlap([from, to], [range.from, range.to])) {
          newMap.set(key, range);
        }
      }
      newMap.set(text, { text, from, to });
      lockedRangesRef.current = newMap;
    } else {
      lockedRangesRef.current.set(text, { text, from, to });
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
    
    if (isLocked(selection.text)) {
      unlock(selection.text, selection.from, selection.to);
    } else {
      lock(selection.text, selection.from, selection.to);
      setIsOpen(true);
    }
  }, [selection, hasTooltip, isLocked, lock, unlock]);

  const close = useCallback(() => {
    setIsOpen(false);
    setTooltipText('');
  }, []);

  useEffect(() => {
    const editorDom = editor.view.dom;
    
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

    editorDom.addEventListener('dblclick', handleDblClick);
    return () => editorDom.removeEventListener('dblclick', handleDblClick);
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

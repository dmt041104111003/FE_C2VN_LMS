'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Editor } from '@tiptap/react';

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

export function useTooltipSelection(editor: Editor | null) {
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    if (!editor) return;

    const updateSelectedText = () => {
      const { from, to } = editor.state.selection;
      if (from !== to) {
        const text = editor.state.doc.textBetween(from, to);
        setSelectedText(text);
      } else {
        setSelectedText('');
      }
    };

    editor.on('selectionUpdate', updateSelectedText);
    editor.on('transaction', updateSelectedText);

    return () => {
      editor.off('selectionUpdate', updateSelectedText);
      editor.off('transaction', updateSelectedText);
    };
  }, [editor]);

  return selectedText;
}

export function useTooltipEvents(
  editor: Editor | null,
  setTooltipText: (text: string) => void,
  setIsOpen: (open: boolean) => void
) {
  useEffect(() => {
    if (!editor) return;

    const handleDoubleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const tooltipElement = target.closest('[data-tooltip]');

      if (tooltipElement) {
        event.preventDefault();
        event.stopPropagation();

        const tooltipText = tooltipElement.getAttribute('data-tooltip');
        if (tooltipText) {
          setTooltipText(tooltipText);
          setIsOpen(true);
        }
      }
    };

    const editorDom = editor.view.dom;
    editorDom.addEventListener('dblclick', handleDoubleClick);

    return () => {
      editorDom.removeEventListener('dblclick', handleDoubleClick);
    };
  }, [editor, setTooltipText, setIsOpen]);
}

export function useTooltipActions(editor: Editor | null) {
  const addTooltip = useCallback(
    (tooltipText: string) => {
      if (!editor || !tooltipText.trim()) return;

      editor.chain().focus().setTooltip({ tooltip: tooltipText.trim() }).run();
    },
    [editor]
  );

  const removeTooltip = useCallback(() => {
    if (!editor) return;

    editor.chain().focus().unsetTooltip().run();
  }, [editor]);

  const unlockText = useCallback(
    (from: number, to: number) => {
      if (!editor) return;

      editor.chain().focus().setTextSelection({ from, to }).unsetMark('lockMark').run();
    },
    [editor]
  );

  const lockText = useCallback(() => {
    if (!editor) return;

    editor.chain().focus().setMark('lockMark').run();
  }, [editor]);

  return { addTooltip, removeTooltip, unlockText, lockText };
}

export function useLockedTexts(editor: Editor | null) {
  const [lockedTexts, setLockedTexts] = useState<Set<string>>(new Set());

  const addLockedText = useCallback(
    (text: string, from: number, to: number) => {
      if (!editor) return;

      setLockedTexts((prev) => {
        const newSet = new Set(prev);
        const docText = editor.state.doc.textContent;

        let hasOverlap = false;
        for (const lockedText of prev) {
          const lockedTextIndex = docText.indexOf(lockedText);
          if (lockedTextIndex !== -1) {
            const lockedFrom = lockedTextIndex;
            const lockedTo = lockedTextIndex + lockedText.length;

            if (
              (from >= lockedFrom && from < lockedTo) ||
              (to > lockedFrom && to <= lockedTo) ||
              (from <= lockedFrom && to >= lockedTo)
            ) {
              hasOverlap = true;
              break;
            }
          }
        }

        if (hasOverlap) {
          const nonOverlapping = new Set<string>();
          for (const lockedText of prev) {
            const lockedTextIndex = docText.indexOf(lockedText);
            if (lockedTextIndex !== -1) {
              const lockedFrom = lockedTextIndex;
              const lockedTo = lockedTextIndex + lockedText.length;

              if (
                !(
                  (from >= lockedFrom && from < lockedTo) ||
                  (to > lockedFrom && to <= lockedTo) ||
                  (from <= lockedFrom && to >= lockedTo)
                )
              ) {
                nonOverlapping.add(lockedText);
              }
            }
          }
          nonOverlapping.add(text);
          return nonOverlapping;
        } else {
          newSet.add(text);
          return newSet;
        }
      });
    },
    [editor]
  );

  const removeLockedText = useCallback((text: string) => {
    setLockedTexts((prev) => {
      const newSet = new Set(prev);
      newSet.delete(text);
      return newSet;
    });
  }, []);

  return { lockedTexts, addLockedText, removeLockedText };
}

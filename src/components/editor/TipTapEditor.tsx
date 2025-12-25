'use client';

import { memo, useState, useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import { Strike } from '@tiptap/extension-strike';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { Highlight } from '@tiptap/extension-highlight';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Tooltip, LockMark } from './extensions';
import { MenuBar } from './components';
import * as S from './editor.styles';
import { EDITOR_LABELS, EDITOR_CONFIG } from '@/constants';
import type { TipTapEditorProps } from '@/types/editor';

function EditorSkeleton() {
  return (
    <div className={S.EDITOR.CONTAINER}>
      <div className={`border-b border-[var(--text)]/10 px-4 py-3 ${S.EDITOR.LOADING}`}>
        <div className="flex gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-1">
              <div className="h-2 w-12 bg-[var(--text)]/10 rounded" />
              <div className="h-6 w-20 bg-[var(--text)]/10 rounded" />
            </div>
          ))}
        </div>
      </div>
      <div className={`p-4 min-h-[200px] ${S.EDITOR.LOADING}`}>
        <div className={S.EDITOR.LOADING_BAR} />
        <div className={S.EDITOR.LOADING_BAR} />
        <div className={`${S.EDITOR.LOADING_BAR} w-3/4`} />
      </div>
    </div>
  );
}

function TipTapEditorComponent({
  content,
  onChange,
  placeholder = EDITOR_LABELS.placeholder,
  minHeight = EDITOR_CONFIG.minHeight,
  className = '',
}: TipTapEditorProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleUpdate = useCallback(
    ({ editor }: { editor: any }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    [onChange]
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Strike,
      Subscript,
      Superscript,
      Highlight.configure({
        multicolor: true,
      }),
      Placeholder.configure({
        placeholder,
      }),
      Tooltip,
      LockMark,
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg max-w-none focus:outline-none',
        style: `min-height: ${minHeight}`,
      },
      transformPastedHTML: (html: string) => {
        try {
          return html.replace(/-(\d{2,5})x(\d{2,5})(?=\.(?:jpe?g|png|webp|gif)(?:[?#"']|\s|>))/gi, '');
        } catch {
          return html;
        }
      },
    },
    onUpdate: handleUpdate,
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || '');
    }
  }, [content, editor]);

  if (!isClient) {
    return <EditorSkeleton />;
  }

  return (
    <div className={`${S.EDITOR.CONTAINER} ${className}`} suppressHydrationWarning>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className={`${S.EDITOR.CONTENT}`} />
      <style jsx global>{`${S.PROSEMIRROR_STYLES}`}</style>
    </div>
  );
}

export const TipTapEditor = memo(TipTapEditorComponent);

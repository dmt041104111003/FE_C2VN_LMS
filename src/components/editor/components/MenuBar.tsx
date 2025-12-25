'use client';

import { memo, useCallback, useMemo } from 'react';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  HighlightIcon,
  UndoIcon,
  RedoIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  ListIcon,
  OrderedListIcon,
  QuoteIcon,
  CodeIcon,
  TableIcon,
  LinkIcon,
  ImageIcon,
  HorizontalRuleIcon,
} from '@/components/ui';
import { LinkModal, ImageModal } from './EditorModal';
import { TooltipButton } from './TooltipButton';
import { useModalState } from '../hooks';
import { MENU_STYLES as S, TOOLBAR_ACTIONS as A, TOOLBAR_CHECKS as C } from '@/constants';
import type { MenuBarProps, ButtonConfig, ButtonGroupConfig } from '@/types/editor';

const ToolbarButton = memo(function ToolbarButton({ 
  icon: Icon, 
  label, 
  title, 
  action, 
  isActive = false, 
  disabled = false,
}: ButtonConfig) {
  const className = `${S.BTN} ${isActive ? S.BTN_ACTIVE : ''}`;
  
  return (
    <button onClick={action} disabled={disabled} className={className} title={title}>
      {Icon ? <Icon className={S.ICON} /> : <span className={S.HEADING_LABEL}>{label}</span>}
    </button>
  );
});

const ButtonGroup = memo(function ButtonGroup({ buttons }: ButtonGroupConfig) {
  return (
    <div className={S.GROUP}>
      {buttons.map((btn, i) => <ToolbarButton key={i} {...btn} />)}
    </div>
  );
});

function MenuBarComponent({ editor }: MenuBarProps) {
  const linkModal = useModalState(editor, useCallback((url: string) => {
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]));

  const imageModal = useModalState(editor, useCallback((url: string) => {
    editor?.chain().focus().setImage({ src: url }).run();
  }, [editor]));

  const groups = useMemo(() => {
    if (!editor) return [];

    return [
      {
        buttons: [
          { icon: UndoIcon, title: 'Hoàn tác', action: () => A.undo(editor), disabled: !C.canUndo(editor) },
          { icon: RedoIcon, title: 'Làm lại', action: () => A.redo(editor), disabled: !C.canRedo(editor) },
        ],
      },
      {
        buttons: [
          { icon: BoldIcon, title: 'Đậm', action: () => A.bold(editor), isActive: C.isBold(editor) },
          { icon: ItalicIcon, title: 'Nghiêng', action: () => A.italic(editor), isActive: C.isItalic(editor) },
          { icon: UnderlineIcon, title: 'Gạch chân', action: () => A.underline(editor), isActive: C.isUnderline(editor) },
          { icon: StrikethroughIcon, title: 'Gạch ngang', action: () => A.strike(editor), isActive: C.isStrike(editor) },
          { icon: HighlightIcon, title: 'Highlight', action: () => A.highlight(editor), isActive: C.isHighlight(editor) },
        ],
      },
      {
        buttons: [
          { label: 'H1', title: 'Heading 1', action: () => A.h1(editor), isActive: C.isH1(editor) },
          { label: 'H2', title: 'Heading 2', action: () => A.h2(editor), isActive: C.isH2(editor) },
          { label: 'H3', title: 'Heading 3', action: () => A.h3(editor), isActive: C.isH3(editor) },
        ],
      },
      {
        buttons: [
          { icon: AlignLeftIcon, title: 'Căn trái', action: () => A.alignLeft(editor), isActive: C.isAlignLeft(editor) },
          { icon: AlignCenterIcon, title: 'Căn giữa', action: () => A.alignCenter(editor), isActive: C.isAlignCenter(editor) },
          { icon: AlignRightIcon, title: 'Căn phải', action: () => A.alignRight(editor), isActive: C.isAlignRight(editor) },
        ],
      },
      {
        buttons: [
          { icon: ListIcon, title: 'Danh sách', action: () => A.bulletList(editor), isActive: C.isBulletList(editor) },
          { icon: OrderedListIcon, title: 'Danh sách số', action: () => A.orderedList(editor), isActive: C.isOrderedList(editor) },
          { icon: QuoteIcon, title: 'Trích dẫn', action: () => A.blockquote(editor), isActive: C.isBlockquote(editor) },
          { icon: CodeIcon, title: 'Code', action: () => A.codeBlock(editor), isActive: C.isCodeBlock(editor) },
        ],
      },
      {
        buttons: [
          { icon: LinkIcon, title: 'Link', action: linkModal.open, isActive: C.isLink(editor) },
          { icon: ImageIcon, title: 'Ảnh', action: imageModal.open },
          { icon: TableIcon, title: 'Bảng', action: () => A.table(editor) },
          { icon: HorizontalRuleIcon, title: 'Đường kẻ', action: () => A.horizontalRule(editor) },
        ],
      },
    ];
  }, [editor, linkModal.open, imageModal.open]);

  if (!editor) return null;

  return (
    <>
      <div className={S.WRAPPER}>
        <div className={S.ROW}>
          {groups.map((group, i) => <ButtonGroup key={i} buttons={group.buttons} />)}
          <div className={S.GROUP}>
            <TooltipButton editor={editor} />
          </div>
        </div>
      </div>

      <LinkModal
        isOpen={linkModal.isOpen}
        url={linkModal.url}
        onUrlChange={linkModal.setUrl}
        onConfirm={linkModal.submit}
        onClose={linkModal.close}
      />

      <ImageModal
        isOpen={imageModal.isOpen}
        url={imageModal.url}
        onUrlChange={imageModal.setUrl}
        onConfirm={imageModal.submit}
        onClose={imageModal.close}
      />
    </>
  );
}

export const MenuBar = memo(MenuBarComponent);

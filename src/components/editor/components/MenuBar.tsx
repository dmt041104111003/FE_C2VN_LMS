'use client';

import { memo, useCallback, useMemo } from 'react';
import { LinkModal, ImageModal } from './EditorModal';
import { TooltipButton } from './TooltipButton';
import { useModalState } from '@/hooks';
import { EDITOR_ICON_MAP } from '../editor.icons';
import {
  MENU_STYLES as S,
  TOOLBAR_ACTIONS as A,
  TOOLBAR_CHECKS as C,
  TOOLBAR_BUTTONS as B,
  TOOLBAR_ICON_NAMES,
  TOOLBAR_TITLES_MAP,
} from '@/constants';
import type { MenuBarProps, ButtonConfig, ToolbarButtonDef } from '@/types/editor';

const ToolbarButton = memo(function ToolbarButton({ 
  icon: Icon, 
  label, 
  title, 
  action, 
  isActive = false, 
  disabled = false,
}: ButtonConfig) {
  return (
    <button 
      onClick={action} 
      disabled={disabled} 
      className={`${S.BTN} ${isActive ? S.BTN_ACTIVE : ''}`} 
      title={title}
    >
      {Icon ? <Icon className={S.ICON} /> : <span className={S.HEADING_LABEL}>{label}</span>}
    </button>
  );
});

const ButtonGroup = memo(function ButtonGroup({ children }: { children: React.ReactNode }) {
  return <div className={S.GROUP}>{children}</div>;
});

function MenuBarComponent({ editor }: MenuBarProps) {
  const linkModal = useModalState(editor, useCallback((url: string) => {
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]));

  const imageModal = useModalState(editor, useCallback((url: string) => {
    editor?.chain().focus().setImage({ src: url }).run();
  }, [editor]));

  const modalMap = useMemo(() => ({
    link: linkModal.open,
    image: imageModal.open,
  }), [linkModal.open, imageModal.open]);

  const renderButton = useCallback((btn: ToolbarButtonDef) => {
    const iconName = TOOLBAR_ICON_NAMES[btn.key];
    const Icon = iconName ? EDITOR_ICON_MAP[iconName] : undefined;
    const action = btn.action 
      ? () => (A as any)[btn.action!]?.(editor) 
      : btn.modal 
        ? (modalMap as any)[btn.modal] 
        : undefined;
    const check = btn.check ? (C as any)[btn.check]?.(editor) : false;
    
    return (
      <ToolbarButton
        key={btn.key}
        icon={Icon}
        label={btn.label}
        title={TOOLBAR_TITLES_MAP[btn.key]}
        action={action}
        isActive={!btn.isDisabled && check}
        disabled={btn.isDisabled && !check}
      />
    );
  }, [editor, modalMap]);

  if (!editor) return null;

  return (
    <>
      <div className={S.WRAPPER}>
        <div className={S.ROW}>
          <ButtonGroup>{(B.history as readonly ToolbarButtonDef[]).map(renderButton)}</ButtonGroup>
          <ButtonGroup>{(B.format as readonly ToolbarButtonDef[]).map(renderButton)}</ButtonGroup>
          <ButtonGroup>{(B.heading as readonly ToolbarButtonDef[]).map(renderButton)}</ButtonGroup>
          <ButtonGroup>{(B.align as readonly ToolbarButtonDef[]).map(renderButton)}</ButtonGroup>
          <ButtonGroup>{(B.blocks as readonly ToolbarButtonDef[]).map(renderButton)}</ButtonGroup>
          <ButtonGroup>{(B.insert as readonly ToolbarButtonDef[]).map(renderButton)}</ButtonGroup>
          <ButtonGroup><TooltipButton editor={editor} /></ButtonGroup>
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

import type { Editor } from '@tiptap/react';
import type { ComponentType } from 'react';

export type IconComponent = ComponentType<{ className?: string }>;

export interface ButtonConfig {
  icon?: IconComponent;
  label?: string;
  title: string;
  action: () => void;
  isActive?: boolean;
  disabled?: boolean;
}

export interface ButtonGroupConfig {
  buttons: ButtonConfig[];
}

export interface SelectionInfo {
  from: number;
  to: number;
  hasSelection: boolean;
  text: string;
}

export interface ToolbarItem {
  key: string;
  icon?: IconComponent;
  label?: string;
  title: string;
  action: (editor: Editor) => void;
  isActive?: (editor: Editor) => boolean;
  canExecute?: (editor: Editor) => boolean;
}

export interface ToolbarGroup {
  key: string;
  items: ToolbarItem[];
}

export interface ModalState {
  isOpen: boolean;
  url: string;
}

export interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  minHeight?: string;
  className?: string;
}

export interface TipTapPreviewProps {
  content: string;
  className?: string;
}

export interface MenuBarProps {
  editor: Editor | null;
}

export interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}

export interface TooltipOptions {
  HTMLAttributes: Record<string, string>;
}

export interface TooltipButtonProps {
  editor: Editor;
}

export interface TooltipPopupProps {
  isOpen: boolean;
  selectedText: string;
  tooltipText: string;
  onTooltipTextChange: (text: string) => void;
  onAddTooltip: () => void;
  onRemoveTooltip: () => void;
  onClose: () => void;
}

export interface TooltipBadgesProps {
  lockedTextsSize: number;
  tooltipCount: number;
}

export interface TruncatedTextProps {
  text: string;
  maxLength?: number;
  className?: string;
}

export interface EditorModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export interface LinkModalProps {
  isOpen: boolean;
  url: string;
  onUrlChange: (url: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export interface ImageModalProps {
  isOpen: boolean;
  url: string;
  onUrlChange: (url: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export interface ToolbarButtonDef {
  key: string;
  action?: string;
  check?: string;
  label?: string;
  modal?: string;
  isDisabled?: boolean;
}


export const IS_PROTECTION_ENABLED = process.env.NODE_ENV === 'production';

export const BLOCKED_CTRL_KEYS = new Set(['s', 'u', 'p']);

export const BLOCKED_CTRL_SHIFT_KEYS = new Set(['i', 'j', 'c']);

export const BLOCKED_KEYS = new Set(['F12', 'PrintScreen']);

export const EDITABLE_TAGS = new Set(['INPUT', 'TEXTAREA']);

export const PROTECTION_EVENTS = ['keydown', 'dragstart', 'contextmenu', 'copy'] as const;

export type ProtectionEventType = (typeof PROTECTION_EVENTS)[number];

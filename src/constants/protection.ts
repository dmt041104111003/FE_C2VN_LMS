export const BLOCKED_CTRL_KEYS = new Set(['s', 'u']);

export const BLOCKED_KEYS = new Set<string>();

export const EDITABLE_TAGS = new Set(['INPUT', 'TEXTAREA']);

export const PROTECTION_EVENTS = ['keydown', 'dragstart'] as const;

export type ProtectionEventType = (typeof PROTECTION_EVENTS)[number];

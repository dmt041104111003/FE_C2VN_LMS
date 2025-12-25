export const BLOCKED_CTRL_KEYS = new Set(['c', 's', 'u', 'p', 'a']);
// export const BLOCKED_KEYS = new Set(['F12']);
export const BLOCKED_KEYS = new Set<string>();

export const EDITABLE_TAGS = new Set(['INPUT', 'TEXTAREA']);

export const PROTECTION_EVENTS = [
  // 'contextmenu',
  'keydown', 
  'dragstart',
  'selectstart',
  'copy',
] as const;

export type ProtectionEventType = typeof PROTECTION_EVENTS[number];


export const IS_PROTECTION_ENABLED = 
  process.env.NODE_ENV || 
  process.env.PROTECTION ;

export const BLOCKED_CTRL_KEYS = new Set([
  's',      // save
  'u',      // view source
  'p',      // print
  'c',      // cp
  'a',      // select all
]);

export const BLOCKED_CTRL_SHIFT_KEYS = new Set([
  'i',      // devTools
  'j',      // console
  'c',      // inspect element
  's',      // save as
]);

export const BLOCKED_KEYS = new Set([
  'F12',        // devTools
  'PrintScreen', // screenshot
  'F3',         // search
]);

export const EDITABLE_TAGS = new Set(['INPUT', 'TEXTAREA']);

export const DEVTOOLS_THRESHOLD = 160;


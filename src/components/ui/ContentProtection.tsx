'use client';

import { useEffect, useCallback, useRef } from 'react';
import {
  IS_PROTECTION_ENABLED,
  BLOCKED_CTRL_KEYS,
  BLOCKED_CTRL_SHIFT_KEYS,
  BLOCKED_KEYS,
  EDITABLE_TAGS,
  DEVTOOLS_THRESHOLD,
} from '@/constants';

type EventHandler = (e: Event) => boolean | void;

const isEditableElement = (target: EventTarget | null): boolean => {
  if (!target || !(target instanceof HTMLElement)) return false;
  return EDITABLE_TAGS.has(target.tagName) || target.isContentEditable;
};

const isImageElement = (target: EventTarget | null): boolean => {
  if (!target || !(target instanceof HTMLElement)) return false;
  return target.tagName === 'IMG';
};

const preventDefault = (e: Event): false => {
  e.preventDefault();
  return false;
};

const ALWAYS_PROTECTED_EVENTS = ['dragstart'] as const;
const PRODUCTION_ONLY_EVENTS = ['keydown', 'contextmenu', 'copy', 'cut', 'selectstart'] as const;

export function ContentProtection() {
  const handlersRef = useRef<Map<string, EventHandler>>(new Map());
  const devtoolsOpenRef = useRef(false);

  const createHandlers = useCallback((): Map<string, EventHandler> => {
    const handlers = new Map<string, EventHandler>();

    handlers.set('dragstart', (e: Event) => {
      if (isImageElement(e.target)) {
        return preventDefault(e);
      }
      return true;
    });

    handlers.set('contextmenu', (e: Event) => preventDefault(e));

    handlers.set('copy', (e: Event) => {
      if (isEditableElement(e.target)) return true;
      return preventDefault(e);
    });

    handlers.set('cut', (e: Event) => {
      if (isEditableElement(e.target)) return true;
      return preventDefault(e);
    });

    handlers.set('selectstart', (e: Event) => {
      if (isEditableElement(e.target)) return true;
      return preventDefault(e);
    });

    handlers.set('keydown', (e: Event) => {
      const ke = e as KeyboardEvent;
      const key = ke.key.toLowerCase();

      if (isEditableElement(e.target)) {
        if ((ke.ctrlKey || ke.metaKey) && BLOCKED_CTRL_SHIFT_KEYS.has(key)) {
          return preventDefault(e);
        }
        if (BLOCKED_KEYS.has(ke.key)) {
          return preventDefault(e);
        }
        return true;
      }

      if ((ke.ctrlKey || ke.metaKey) && ke.shiftKey && BLOCKED_CTRL_SHIFT_KEYS.has(key)) {
        return preventDefault(e);
      }

      if ((ke.ctrlKey || ke.metaKey) && BLOCKED_CTRL_KEYS.has(key)) {
        return preventDefault(e);
      }

      if (BLOCKED_KEYS.has(ke.key)) {
        return preventDefault(e);
      }
    });

    return handlers;
  }, []);

  // DevTools detection
  useEffect(() => {
    if (!IS_PROTECTION_ENABLED) return;

    const checkDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > DEVTOOLS_THRESHOLD;
      const heightThreshold = window.outerHeight - window.innerHeight > DEVTOOLS_THRESHOLD;
      
      if (widthThreshold || heightThreshold) {
        if (!devtoolsOpenRef.current) {
          devtoolsOpenRef.current = true;
          document.body.innerHTML = '';
          document.body.style.background = '#000';
        }
      }
    };

    const interval = setInterval(checkDevTools, 1000);
    window.addEventListener('resize', checkDevTools);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkDevTools);
    };
  }, []);

  // Disable console methods
  useEffect(() => {
    if (!IS_PROTECTION_ENABLED) return;

    const noop = () => {};
    const methods = ['log', 'debug', 'info', 'warn', 'error', 'table', 'clear'] as const;
    
    methods.forEach((method) => {
      (console as unknown as Record<string, () => void>)[method] = noop;
    });
  }, []);

  useEffect(() => {
    handlersRef.current = createHandlers();

    ALWAYS_PROTECTED_EVENTS.forEach((event) => {
      const handler = handlersRef.current.get(event);
      if (handler) {
        document.addEventListener(event, handler);
      }
    });

    if (IS_PROTECTION_ENABLED) {
      PRODUCTION_ONLY_EVENTS.forEach((event) => {
        const handler = handlersRef.current.get(event);
        if (handler) {
          document.addEventListener(event, handler);
        }
      });
    }

    return () => {
      ALWAYS_PROTECTED_EVENTS.forEach((event) => {
        const handler = handlersRef.current.get(event);
        if (handler) {
          document.removeEventListener(event, handler);
        }
      });

      if (IS_PROTECTION_ENABLED) {
        PRODUCTION_ONLY_EVENTS.forEach((event) => {
          const handler = handlersRef.current.get(event);
          if (handler) {
            document.removeEventListener(event, handler);
          }
        });
      }
    };
  }, [createHandlers]);

  return null;
}

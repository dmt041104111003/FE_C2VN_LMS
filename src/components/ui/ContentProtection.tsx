'use client';

import { useEffect, useCallback, useRef } from 'react';
import {
  IS_PROTECTION_ENABLED,
  BLOCKED_CTRL_KEYS,
  BLOCKED_CTRL_SHIFT_KEYS,
  BLOCKED_KEYS,
  EDITABLE_TAGS,
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

const isMediaElement = (target: EventTarget | null): boolean => {
  if (!target || !(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'IMG' || tag === 'VIDEO' || tag === 'CANVAS';
};

const preventDefault = (e: Event): false => {
  e.preventDefault();
  return false;
};

const ALWAYS_PROTECTED_EVENTS = ['dragstart', 'contextmenu', 'copy'] as const;
const PRODUCTION_ONLY_EVENTS = ['keydown'] as const;

export function ContentProtection() {
  const handlersRef = useRef<Map<string, EventHandler>>(new Map());

  const createHandlers = useCallback((): Map<string, EventHandler> => {
    const handlers = new Map<string, EventHandler>();

    handlers.set('dragstart', (e: Event) => {
      if (isImageElement(e.target)) {
        return preventDefault(e);
      }
      return true;
    });

    handlers.set('contextmenu', (e: Event) => {
      if (isMediaElement(e.target)) {
        return preventDefault(e);
      }
      return true;
    });

    handlers.set('copy', (e: Event) => {
      if (isMediaElement(e.target)) {
        return preventDefault(e);
      }
      return true;
    });

    handlers.set('keydown', (e: Event) => {
      const ke = e as KeyboardEvent;
      const key = ke.key.toLowerCase();

      if (isEditableElement(e.target)) return true;

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

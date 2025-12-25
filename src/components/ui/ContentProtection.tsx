'use client';

import { useEffect, useCallback, useRef } from 'react';
import {
  BLOCKED_CTRL_KEYS,
  BLOCKED_KEYS,
  EDITABLE_TAGS,
  PROTECTION_EVENTS,
  ProtectionEventType,
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

export function ContentProtection() {
  const handlersRef = useRef<Map<ProtectionEventType, EventHandler>>(new Map());

  const createHandlers = useCallback((): Map<ProtectionEventType, EventHandler> => {
    const handlers = new Map<ProtectionEventType, EventHandler>();

    handlers.set('keydown', (e: Event) => {
      const ke = e as KeyboardEvent;
      const key = ke.key.toLowerCase();

      if (isEditableElement(e.target)) return true;

      if ((ke.ctrlKey || ke.metaKey) && BLOCKED_CTRL_KEYS.has(key)) {
        return preventDefault(e);
      }

      if (BLOCKED_KEYS.has(ke.key)) {
        return preventDefault(e);
      }
    });

    handlers.set('dragstart', (e: Event) => {
      if (isImageElement(e.target)) {
        return preventDefault(e);
      }
      return true;
    });

    return handlers;
  }, []);

  useEffect(() => {
    handlersRef.current = createHandlers();

    PROTECTION_EVENTS.forEach((event) => {
      const handler = handlersRef.current.get(event);
      if (handler) {
        document.addEventListener(event, handler);
      }
    });

    return () => {
      PROTECTION_EVENTS.forEach((event) => {
        const handler = handlersRef.current.get(event);
        if (handler) {
          document.removeEventListener(event, handler);
        }
      });
    };
  }, [createHandlers]);

  return null;
}

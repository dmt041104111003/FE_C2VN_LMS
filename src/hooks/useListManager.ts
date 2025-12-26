import { useCallback } from 'react';

interface HasId {
  id: string;
}

type ListUpdater<T> = (items: T[]) => T[];

export function useListManager<T extends HasId>(
  setList: (updater: ListUpdater<T>) => void
) {
  const addItem = useCallback((createItem: () => T) => {
    setList(items => [...items, createItem()]);
  }, [setList]);

  const updateItem = useCallback((index: number, item: T) => {
    setList(items => items.map((it, i) => i === index ? item : it));
  }, [setList]);

  const removeItem = useCallback((index: number) => {
    setList(items => items.filter((_, i) => i !== index));
  }, [setList]);

  return { addItem, updateItem, removeItem };
}

export const updateAtIndex = <T,>(
  arr: T[],
  index: number,
  item: T
): T[] => arr.map((it, i) => i === index ? item : it);

export const removeAtIndex = <T,>(
  arr: T[],
  index: number
): T[] => arr.filter((_, i) => i !== index);

export const appendItem = <T,>(arr: T[], item: T): T[] => [...arr, item];


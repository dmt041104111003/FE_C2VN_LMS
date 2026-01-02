'use client';

import { useState, useCallback, useEffect } from 'react';
import { Button, useToast, Dialog, TrashIcon, PlusIcon } from '@/components/ui';
import { ICON_SM } from '@/components/ui/ui.styles';
import { TAG_LABELS as LABELS, TAG_STYLES as S } from '@/constants/tag';
import { tagService, type TagResponse } from '@/services/tag';
import { translateError } from '@/constants/auth';
import { InstructorLayout } from './InstructorLayout';
import { formatDate } from '@/constants/config';

export function TagManagementPage() {
  const toast = useToast();
  const [tags, setTags] = useState<TagResponse[]>([]);
  const [newTagName, setNewTagName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<TagResponse | null>(null);

  const loadTags = useCallback(async () => {
    try {
      const data = await tagService.getAll();
      setTags(data);
    } catch (err) {
      const msg = err instanceof Error ? translateError(err.message) : LABELS.toast.loadError;
      toast.error(msg);
    }
  }, [toast]);

  useEffect(() => {
    loadTags();
  }, [loadTags]);

  const handleCreateTag = useCallback(async () => {
    const name = newTagName.trim();
    if (!name) {
      toast.error(LABELS.toast.emptyName);
      return;
    }

    setIsSubmitting(true);
    try {
      const newTag = await tagService.create({ name });
      setTags(prev => [...prev, newTag]);
      setNewTagName('');
      toast.success(LABELS.toast.createSuccess);
    } catch (err) {
      const msg = err instanceof Error ? translateError(err.message) : LABELS.toast.createError;
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  }, [newTagName, toast]);

  const handleDeleteClick = useCallback((tag: TagResponse) => {
    setDeleteTarget(tag);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deleteTarget) return;

    try {
      await tagService.delete(deleteTarget.id);
      setTags(prev => prev.filter(t => t.id !== deleteTarget.id));
      toast.success(LABELS.toast.deleteSuccess);
    } catch (err) {
      const msg = err instanceof Error ? translateError(err.message) : LABELS.toast.deleteError;
      toast.error(msg);
    } finally {
      setDeleteTarget(null);
    }
  }, [deleteTarget, toast]);

  const handleCancelDelete = useCallback(() => {
    setDeleteTarget(null);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isSubmitting) {
      handleCreateTag();
    }
  }, [handleCreateTag, isSubmitting]);

  return (
    <InstructorLayout activeId="tags" title={LABELS.pageTitle}>
      <Dialog
        isOpen={Boolean(deleteTarget)}
        title={LABELS.confirm.deleteTitle}
        message={`${LABELS.confirm.deleteMessage} (${deleteTarget?.name})`}
        primaryText={LABELS.delete}
        secondaryText="Hủy"
        onPrimary={handleConfirmDelete}
        onSecondary={handleCancelDelete}
      />

      <div className={S.PAGE}>
        <div className={S.HEADER}>
          <h1 className={S.TITLE}>{LABELS.title}</h1>
        </div>

        <div className={S.INPUT_GROUP}>
          <input
            type="text"
            value={newTagName}
            onChange={e => setNewTagName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={LABELS.inputPlaceholder}
            className={S.INPUT}
            disabled={isSubmitting}
          />
          <Button
            variant="primary"
            onClick={handleCreateTag}
            disabled={isSubmitting || !newTagName.trim()}
            className="gap-1.5 whitespace-nowrap"
          >
            <PlusIcon className={ICON_SM} />
            {LABELS.addTag}
          </Button>
        </div>

        {tags.length === 0 ? (
          <div className={S.EMPTY}>{LABELS.empty}</div>
        ) : (
          <div className={S.LIST}>
            {tags.map(tag => (
              <div key={tag.id} className={S.TAG_CARD}>
                <div className={S.TAG_INFO}>
                  <span className={S.TAG_NAME}>{tag.name}</span>
                  <span className={S.TAG_META}>
                    {tag.numOfCourses || 0} {LABELS.courses}
                    {tag.createdAt && ` • ${formatDate(tag.createdAt)}`}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteClick(tag)}
                  className={S.DELETE_BTN}
                  title={LABELS.delete}
                >
                  <TrashIcon className={ICON_SM} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </InstructorLayout>
  );
}

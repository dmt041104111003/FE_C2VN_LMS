'use client';

import { useState, useMemo } from 'react';
import { Tabs } from '@/components/ui';
import { TipTapEditor, TipTapPreview } from '@/components/editor';
import { EDITOR_DEMO_TABS, EDITOR_DEMO_CONTENT, EDITOR_DEMO_STYLES as S } from '@/constants';

type TabKey = 'split' | 'editor' | 'preview';

export default function EditorDemoPage() {
  const [content, setContent] = useState(EDITOR_DEMO_CONTENT);
  const [activeTab, setActiveTab] = useState<TabKey>('split');

  const showEditor = activeTab === 'split' || activeTab === 'editor';
  const showPreview = activeTab === 'split' || activeTab === 'preview';
  const gridClass = activeTab === 'split' ? S.GRID_SPLIT : S.GRID_SINGLE;

  const tabs = useMemo(() => EDITOR_DEMO_TABS.map(t => ({ ...t })), []);

  return (
    <div className={S.PAGE}>
      <div className={S.CONTAINER}>
        <header className={S.HEADER}>
          <h1 className={S.TITLE}>TipTap Editor Demo</h1>
          <p className={S.DESC}>
            Rich text editor với đầy đủ tính năng: format, tables, code blocks, tooltips...
          </p>
        </header>

        <Tabs
          items={tabs}
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key as TabKey)}
          variant="underline"
          className={S.TABS}
        />

        <div className={gridClass}>
          {showEditor && (
            <section>
              <h2 className={S.SECTION_LABEL}>Editor</h2>
              <TipTapEditor
                content={content}
                onChange={setContent}
                placeholder="Bắt đầu viết nội dung..."
                minHeight="500px"
              />
            </section>
          )}

          {showPreview && (
            <section>
              <h2 className={S.SECTION_LABEL}>Preview</h2>
              <div className={S.PREVIEW_WRAPPER}>
                <TipTapPreview content={content} />
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

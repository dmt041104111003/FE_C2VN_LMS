export const EDITOR_LABELS = {
  placeholder: 'Bắt đầu viết nội dung...',
  loading: 'Đang tải editor...',
  addLink: 'Thêm Link',
  addImage: 'Thêm Ảnh',
  addTooltip: 'Thêm Tooltip',
  removeTooltip: 'Xóa Tooltip',
  linkUrl: 'URL',
  linkPlaceholder: 'https://example.com',
  imageUrl: 'URL Ảnh',
  imagePlaceholder: 'https://example.com/image.jpg',
  tooltipContent: 'Nội dung Tooltip',
  tooltipPlaceholder: 'Nhập giải thích cho text đã chọn...',
  cancel: 'Hủy',
  confirm: 'Xác nhận',
  copied: 'Đã copy!',
  copy: 'Copy',
  selectedText: 'Text đã chọn:',
  showMore: 'Xem thêm',
  showLess: 'Thu gọn',
} as const;

export const TOOLBAR_TITLES = {
  bold: 'In đậm (Ctrl+B)',
  italic: 'In nghiêng (Ctrl+I)',
  underline: 'Gạch chân (Ctrl+U)',
  strike: 'Gạch ngang',
  highlight: 'Highlight',
  toggleCase: 'Đổi UPPERCASE/lowercase',
  subscript: 'Subscript',
  superscript: 'Superscript',
  horizontalRule: 'Đường kẻ ngang',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  h5: 'Heading 5',
  h6: 'Heading 6',
  bulletList: 'Danh sách',
  orderedList: 'Danh sách số',
  blockquote: 'Trích dẫn',
  codeBlock: 'Code Block',
  table: 'Chèn Bảng',
  alignLeft: 'Căn trái',
  alignCenter: 'Căn giữa',
  alignRight: 'Căn phải',
  alignJustify: 'Căn đều',
  link: 'Thêm Link',
  image: 'Thêm Ảnh',
  undo: 'Hoàn tác (Ctrl+Z)',
  redo: 'Làm lại (Ctrl+Y)',
  tooltip: 'Thêm Tooltip',
  tooltipDisabled: 'Chọn text để thêm tooltip',
} as const;

export const EDITOR_CONFIG = {
  minHeight: '200px',
  maxTooltipPreviewLength: 100,
  defaultTableRows: 3,
  defaultTableCols: 3,
  codeBlockLanguage: 'javascript',
} as const;

export const MENU_STYLES = {
  WRAPPER: 'border-b border-[var(--text)]/10 px-4 py-3 bg-[var(--bg)]',
  ROW: 'flex flex-wrap items-center gap-1',
  GROUP: 'flex items-center gap-1 px-2 border-r border-[var(--text)]/10 last:border-r-0',
  BTN: 'p-2 rounded text-[var(--text)]/40 hover:text-[var(--text)] hover:bg-[var(--text)]/5 transition-colors disabled:opacity-20 disabled:cursor-not-allowed',
  BTN_ACTIVE: 'text-[var(--accent)] bg-[var(--accent)]/10',
  ICON: 'w-4 h-4',
  HEADING_LABEL: 'text-xs font-bold',
} as const;

export const TOOLBAR_ACTIONS = {
  undo: (e: any) => e.chain().focus().undo().run(),
  redo: (e: any) => e.chain().focus().redo().run(),
  bold: (e: any) => e.chain().focus().toggleBold().run(),
  italic: (e: any) => e.chain().focus().toggleItalic().run(),
  underline: (e: any) => e.chain().focus().toggleUnderline().run(),
  strike: (e: any) => e.chain().focus().toggleStrike().run(),
  highlight: (e: any) => e.chain().focus().toggleHighlight().run(),
  h1: (e: any) => e.chain().focus().toggleHeading({ level: 1 }).run(),
  h2: (e: any) => e.chain().focus().toggleHeading({ level: 2 }).run(),
  h3: (e: any) => e.chain().focus().toggleHeading({ level: 3 }).run(),
  alignLeft: (e: any) => e.chain().focus().setTextAlign('left').run(),
  alignCenter: (e: any) => e.chain().focus().setTextAlign('center').run(),
  alignRight: (e: any) => e.chain().focus().setTextAlign('right').run(),
  bulletList: (e: any) => e.chain().focus().toggleBulletList().run(),
  orderedList: (e: any) => e.chain().focus().toggleOrderedList().run(),
  blockquote: (e: any) => e.chain().focus().toggleBlockquote().run(),
  codeBlock: (e: any) => e.chain().focus().toggleCodeBlock().run(),
  horizontalRule: (e: any) => e.chain().focus().setHorizontalRule().run(),
  table: (e: any, rows = 3, cols = 3) => e.chain().focus().insertTable({ 
    rows, 
    cols, 
    withHeaderRow: true 
  }).run(),
} as const;

export const TOOLBAR_CHECKS = {
  canUndo: (e: any) => e.can().chain().focus().undo().run(),
  canRedo: (e: any) => e.can().chain().focus().redo().run(),
  isBold: (e: any) => e.isActive('bold'),
  isItalic: (e: any) => e.isActive('italic'),
  isUnderline: (e: any) => e.isActive('underline'),
  isStrike: (e: any) => e.isActive('strike'),
  isHighlight: (e: any) => e.isActive('highlight'),
  isH1: (e: any) => e.isActive('heading', { level: 1 }),
  isH2: (e: any) => e.isActive('heading', { level: 2 }),
  isH3: (e: any) => e.isActive('heading', { level: 3 }),
  isAlignLeft: (e: any) => e.isActive({ textAlign: 'left' }),
  isAlignCenter: (e: any) => e.isActive({ textAlign: 'center' }),
  isAlignRight: (e: any) => e.isActive({ textAlign: 'right' }),
  isBulletList: (e: any) => e.isActive('bulletList'),
  isOrderedList: (e: any) => e.isActive('orderedList'),
  isBlockquote: (e: any) => e.isActive('blockquote'),
  isCodeBlock: (e: any) => e.isActive('codeBlock'),
  isLink: (e: any) => e.isActive('link'),
} as const;

import type { SelectionInfo } from '@/types/editor';

export const hasTooltipMark = (editor: any): boolean => editor.isActive('tooltip');

export const getSelectionInfo = (editor: any): SelectionInfo => {
  const { from, to } = editor.state.selection;
  const hasSelection = from !== to;
  return {
    from,
    to,
    hasSelection,
    text: hasSelection ? editor.state.doc.textBetween(from, to) : '',
  };
};

export const rangesOverlap = (a: [number, number], b: [number, number]): boolean =>
  a[0] < b[1] && b[0] < a[1];

export const TOOLBAR_BUTTONS = {
  history: [
    { key: 'undo', action: 'undo', check: 'canUndo', isDisabled: true },
    { key: 'redo', action: 'redo', check: 'canRedo', isDisabled: true },
  ],
  format: [
    { key: 'bold', action: 'bold', check: 'isBold' },
    { key: 'italic', action: 'italic', check: 'isItalic' },
    { key: 'underline', action: 'underline', check: 'isUnderline' },
    { key: 'strike', action: 'strike', check: 'isStrike' },
    { key: 'highlight', action: 'highlight', check: 'isHighlight' },
  ],
  heading: [
    { key: 'h1', action: 'h1', check: 'isH1', label: 'H1' },
    { key: 'h2', action: 'h2', check: 'isH2', label: 'H2' },
    { key: 'h3', action: 'h3', check: 'isH3', label: 'H3' },
  ],
  align: [
    { key: 'alignLeft', action: 'alignLeft', check: 'isAlignLeft' },
    { key: 'alignCenter', action: 'alignCenter', check: 'isAlignCenter' },
    { key: 'alignRight', action: 'alignRight', check: 'isAlignRight' },
  ],
  blocks: [
    { key: 'bulletList', action: 'bulletList', check: 'isBulletList' },
    { key: 'orderedList', action: 'orderedList', check: 'isOrderedList' },
    { key: 'blockquote', action: 'blockquote', check: 'isBlockquote' },
    { key: 'codeBlock', action: 'codeBlock', check: 'isCodeBlock' },
  ],
  insert: [
    { key: 'link', check: 'isLink', modal: 'link' },
    { key: 'image', modal: 'image' },
    { key: 'table', action: 'table' },
    { key: 'horizontalRule', action: 'horizontalRule' },
  ],
} as const;

export const TOOLBAR_TITLES_MAP: Record<string, string> = {
  undo: 'Hoàn tác',
  redo: 'Làm lại',
  bold: 'Đậm',
  italic: 'Nghiêng',
  underline: 'Gạch chân',
  strike: 'Gạch ngang',
  highlight: 'Highlight',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  alignLeft: 'Căn trái',
  alignCenter: 'Căn giữa',
  alignRight: 'Căn phải',
  bulletList: 'Danh sách',
  orderedList: 'Danh sách số',
  blockquote: 'Trích dẫn',
  codeBlock: 'Code',
  link: 'Link',
  image: 'Ảnh',
  table: 'Bảng',
  horizontalRule: 'Đường kẻ',
} as const;

export const TOOLBAR_ICON_NAMES: Record<string, string> = {
  undo: 'UndoIcon',
  redo: 'RedoIcon',
  bold: 'BoldIcon',
  italic: 'ItalicIcon',
  underline: 'UnderlineIcon',
  strike: 'StrikethroughIcon',
  highlight: 'HighlightIcon',
  alignLeft: 'AlignLeftIcon',
  alignCenter: 'AlignCenterIcon',
  alignRight: 'AlignRightIcon',
  bulletList: 'ListIcon',
  orderedList: 'OrderedListIcon',
  blockquote: 'QuoteIcon',
  codeBlock: 'CodeIcon',
  link: 'LinkIcon',
  image: 'ImageIcon',
  table: 'TableIcon',
  horizontalRule: 'HorizontalRuleIcon',
} as const;

export const EDITOR_DEMO_TABS = [
  { key: 'split', label: 'Split View' },
  { key: 'editor', label: 'Editor' },
  { key: 'preview', label: 'Preview' },
] as const;

export const EDITOR_DEMO_STYLES = {
  PAGE: 'min-h-screen bg-[var(--bg)] py-8 px-4',
  CONTAINER: 'max-w-7xl mx-auto',
  HEADER: 'mb-8',
  TITLE: 'text-3xl font-bold text-[var(--text)] mb-2',
  DESC: 'text-[var(--text)]/60',
  TABS: 'mb-6',
  GRID_SPLIT: 'grid gap-6 grid-cols-1 lg:grid-cols-2',
  GRID_SINGLE: 'grid gap-6 grid-cols-1',
  SECTION_LABEL: 'text-xs text-[var(--text)]/40 uppercase tracking-wider mb-3',
  PREVIEW_WRAPPER: 'border border-[var(--text)]/10 rounded-xl p-6 bg-[var(--bg)] min-h-[500px]',
} as const;

export const EDITOR_DEMO_CONTENT = `
<h1>Chào mừng đến với TipTap Editor</h1>
<p>Đây là một editor <strong>rich text</strong> được xây dựng với <em>TipTap</em> và <mark>React</mark>.</p>

<h2>Tính năng nổi bật</h2>
<ul>
  <li>Format text: Bold, Italic, Underline, Strike</li>
  <li>Headings từ H1 đến H6</li>
  <li>Lists: Bullet và Numbered</li>
  <li>Blockquote</li>
  <li>Code blocks với syntax highlighting</li>
  <li>Tables</li>
  <li>Links và Images</li>
  <li><span data-tooltip="Tooltip là tính năng giúp giải thích thuật ngữ khi hover">Tooltip</span> cho thuật ngữ</li>
</ul>

<h2>Code Example</h2>
<pre><code class="language-javascript">function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');</code></pre>

<blockquote>
  <p>TipTap là một headless editor framework cho React, Vue, và Vanilla JS.</p>
</blockquote>

<h2>Bảng Demo</h2>
<table>
  <tr>
    <th>Tính năng</th>
    <th>Mô tả</th>
    <th>Trạng thái</th>
  </tr>
  <tr>
    <td>Rich Text</td>
    <td>Format text đầy đủ</td>
    <td>Hoàn thành</td>
  </tr>
  <tr>
    <td>Tables</td>
    <td>Chèn và chỉnh sửa bảng</td>
    <td>Hoàn thành</td>
  </tr>
  <tr>
    <td>Tooltip</td>
    <td>Giải thích thuật ngữ</td>
    <td>Hoàn thành</td>
  </tr>
</table>
`;


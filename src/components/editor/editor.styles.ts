export const EDITOR = {
  CONTAINER: 'border border-[var(--text)]/20 rounded-xl overflow-hidden bg-[var(--bg)]',
  CONTENT: 'p-4',
  LOADING: 'animate-pulse',
  LOADING_BAR: 'h-4 bg-[var(--text)]/10 rounded mb-2',
} as const;

export const TOOLTIP = {
  BUTTON_WRAPPER: 'relative',
  BADGE: 'absolute -top-1 -right-1 text-[var(--bg)] text-xs rounded-full w-4 h-4 flex items-center justify-center z-10 bg-[var(--accent)]',
  BADGE_LOCKED: 'bg-[var(--accent-light)]',
  BADGE_COUNT: 'bg-[var(--accent)] -bottom-1 -left-1 -top-auto -right-auto',
} as const;

export const PREVIEW = {
  CONTAINER: 'p-4',
  CODE_COPY_BTN: 'absolute top-2 right-2 px-2 py-1 text-xs bg-[var(--bg-alt)] text-[var(--text)]/60 rounded hover:bg-[var(--accent)] hover:text-white transition-colors',
} as const;

export const PROSEMIRROR_STYLES = `
  .ProseMirror {
    outline: none;
    min-height: 200px;
    color: var(--text);
    background-color: transparent;
  }

  .ProseMirror p.is-editor-empty:first-child::before {
    color: var(--text);
    opacity: 0.4;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }

  .ProseMirror h1 { font-size: 2rem; font-weight: 700; margin: 1.5rem 0 0.5rem; color: var(--text); }
  .ProseMirror h2 { font-size: 1.5rem; font-weight: 600; margin: 1.25rem 0 0.5rem; color: var(--text); }
  .ProseMirror h3 { font-size: 1.25rem; font-weight: 600; margin: 1rem 0 0.5rem; color: var(--text); }
  .ProseMirror h4 { font-size: 1.125rem; font-weight: 600; margin: 1rem 0 0.5rem; color: var(--text); }
  .ProseMirror h5 { font-size: 1rem; font-weight: 600; margin: 1rem 0 0.5rem; color: var(--text); }
  .ProseMirror h6 { font-size: 0.875rem; font-weight: 600; margin: 1rem 0 0.5rem; color: var(--text); }

  .ProseMirror p {
    margin-bottom: 1rem;
    line-height: 1.75;
    color: var(--text);
  }

  .ProseMirror ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
  .ProseMirror ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
  .ProseMirror li { margin-bottom: 0.25rem; color: var(--text); }

  .ProseMirror blockquote {
    border-left: 4px solid var(--accent);
    padding-left: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    margin: 1rem 0;
    background-color: var(--bg-alt);
    border-radius: 0 0.5rem 0.5rem 0;
    color: var(--text);
    opacity: 0.9;
  }

  .ProseMirror code {
    background-color: var(--bg-alt);
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-family: var(--font-mono);
    font-size: 0.875rem;
    color: var(--accent);
  }

  .ProseMirror pre {
    background-color: var(--bg-alt);
    color: var(--text);
    padding: 1rem;
    border-radius: 0.5rem;
    margin: 1rem 0;
    overflow-x: auto;
    font-family: var(--font-mono);
    font-size: 0.875rem;
    border: 1px solid var(--text)/10;
  }

  .ProseMirror pre code {
    background-color: transparent;
    padding: 0;
    color: inherit;
  }

  .ProseMirror a {
    color: var(--accent);
    text-decoration: underline;
    cursor: pointer;
  }

  .ProseMirror a:hover {
    opacity: 0.8;
  }

  .ProseMirror img {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    margin: 1rem 0;
  }

  .ProseMirror table {
    border-collapse: collapse;
    width: 100%;
    margin: 1rem 0;
    table-layout: fixed;
    border: 2px solid var(--text);
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .ProseMirror table colgroup {
    display: table-column-group;
  }

  .ProseMirror table col {
    display: table-column;
  }

  .ProseMirror th,
  .ProseMirror td {
    border: 1px solid var(--text);
    padding: 0.75rem 1rem;
    text-align: left;
    color: var(--text);
    position: relative;
    min-width: 80px;
    vertical-align: top;
  }

  .ProseMirror th {
    background-color: var(--bg-alt);
    font-weight: 600;
    color: var(--text);
    text-align: center;
  }

  .ProseMirror td {
    background-color: var(--bg);
    color: var(--text);
  }

  .ProseMirror .selectedCell {
    background-color: var(--bg-alt) !important;
    outline: 2px solid var(--accent);
    outline-offset: -2px;
  }

  .ProseMirror .column-resize-handle {
    position: absolute;
    right: -2px;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color: var(--accent);
    cursor: col-resize;
    z-index: 50;
  }

  .ProseMirror .tableWrapper {
    overflow-x: auto;
    margin: 1rem 0;
  }

  .ProseMirror.resize-cursor {
    cursor: col-resize;
  }

  .ProseMirror hr {
    border: none;
    border-top: 2px solid var(--bg-alt);
    margin: 2rem 0;
  }

  .ProseMirror mark {
    background-color: var(--bg-alt);
    color: var(--accent);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-weight: 500;
  }

  .ProseMirror strong { font-weight: 600; color: var(--text); }
  .ProseMirror em { font-style: italic; }
  .ProseMirror s { text-decoration: line-through; opacity: 0.6; }
  .ProseMirror u { text-decoration: underline; }
  .ProseMirror sub { vertical-align: sub; font-size: 0.75em; }
  .ProseMirror sup { vertical-align: super; font-size: 0.75em; }

  .ProseMirror [style*="text-align: left"] { text-align: left; }
  .ProseMirror [style*="text-align: center"] { text-align: center; }
  .ProseMirror [style*="text-align: right"] { text-align: right; }
  .ProseMirror [style*="text-align: justify"] { text-align: justify; }

  .ProseMirror [data-tooltip] {
    background-color: var(--bg-alt);
    color: var(--accent);
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    border-bottom: 2px dashed var(--accent);
    cursor: help;
    position: relative;
    font-weight: 500;
  }

  .ProseMirror [data-lock] {
    background-color: var(--bg-alt);
    border: 2px solid var(--accent);
    border-radius: 0.25rem;
    padding: 0 0.25rem;
  }

  .ProseMirror ::selection {
    background-color: var(--accent);
    color: var(--bg);
  }

  .ProseMirror table ::selection {
    background-color: var(--accent);
    color: var(--bg);
  }

  .ProseMirror th ::selection,
  .ProseMirror td ::selection {
    background-color: var(--accent);
    color: var(--bg);
  }
`;

export const TOOLTIP_STYLES = `
  [data-tooltip] {
    position: relative;
    cursor: help;
    background-color: var(--bg-alt);
    color: var(--accent);
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    border-bottom: 2px dashed var(--accent);
    font-weight: 500;
  }

  [data-tooltip]:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 14px;
    background-color: var(--bg-alt);
    color: var(--text);
    font-size: 13px;
    font-weight: 400;
    line-height: 1.5;
    border-radius: 8px;
    white-space: normal;
    max-width: 280px;
    width: max-content;
    z-index: 9999;
    pointer-events: none;
    box-shadow: 0 4px 20px var(--text)/10;
    border: 1px solid var(--text)/10;
  }

  [data-tooltip]:hover::before {
    content: '';
    position: absolute;
    bottom: calc(100% + 2px);
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: var(--bg-alt);
    z-index: 9999;
    pointer-events: none;
  }
`;

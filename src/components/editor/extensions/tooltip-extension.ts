import { Mark, mergeAttributes } from '@tiptap/core';
import type { TooltipOptions } from '@/types/editor';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    tooltip: {
      setTooltip: (attributes: { tooltip: string }) => ReturnType;
      unsetTooltip: () => ReturnType;
    };
  }
}

export const Tooltip = Mark.create<TooltipOptions>({
  name: 'tooltip',

  addOptions() {
    return {
      HTMLAttributes: {
        class: 'tooltip-trigger',
      },
    };
  },

  addAttributes() {
    return {
      tooltip: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-tooltip'),
        renderHTML: (attributes) => {
          if (!attributes.tooltip) {
            return {};
          }
          return {
            'data-tooltip': attributes.tooltip,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-tooltip]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setTooltip:
        (attributes) =>
        ({ commands }) => {
          return commands.setMark(this.name, attributes);
        },
      unsetTooltip:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});

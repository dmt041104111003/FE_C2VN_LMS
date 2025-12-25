import { Mark, mergeAttributes } from '@tiptap/core';

export const LockMark = Mark.create({
  name: 'lockMark',

  addOptions() {
    return {
      HTMLAttributes: {
        'data-lock': 'true',
      },
    };
  },

  addAttributes() {
    return {
      class: {
        default: null,
        parseHTML: (element) => element.getAttribute('class'),
        renderHTML: (attributes) => {
          if (!attributes.class) {
            return {};
          }
          return {
            class: attributes.class,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-lock]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
});


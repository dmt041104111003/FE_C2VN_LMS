import { DEMO } from './demo';

export const FEEDBACK_FIELDS = [
  {
    name: 'name',
    type: 'text' as const,
    placeholder: DEMO.namePlaceholder,
  },
  {
    name: 'phone',
    type: 'tel' as const,
    placeholder: DEMO.phonePlaceholder,
  },
];


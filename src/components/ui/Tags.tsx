'use client';

import { memo } from 'react';
import { TagsProps } from './ui.types';
import { TAG_BASE } from './ui.styles';

function TagsComponent({ tags, max, className = '' }: TagsProps) {
  const displayTags = max ? tags.slice(0, max) : tags;

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {displayTags.map((tag) => (
        <span key={tag} className={TAG_BASE}>
          {tag}
        </span>
      ))}
    </div>
  );
}

export const Tags = memo(TagsComponent);


'use client';

import { memo } from 'react';
import Link from 'next/link';
import {
  ROUTES,
  HERO,
} from '@/constants';
import {
  HERO_SECTION,
  HERO_CONTAINER,
  HERO_INNER,
  HERO_CONTENT,
  HERO_IMAGE_WRAPPER,
  HERO_IMAGE,
  HERO_SUBTITLE,
  HERO_TITLE,
  HERO_DESC,
  HERO_CTA,
} from './landing.styles';

function HeroComponent() {
  return (
    <section className={HERO_SECTION}>
      <div className={HERO_CONTAINER}>
        <div className={HERO_INNER}>
          <div className={HERO_CONTENT}>
            <p className={HERO_SUBTITLE}>
              {HERO.subtitle}
            </p>
            <h1 className={HERO_TITLE}>
              {HERO.title}
            </h1>
            <p className={HERO_DESC}>
              {HERO.description}
            </p>
            <Link
              href={ROUTES.COURSES}
              className={HERO_CTA}
            >
              {HERO.cta}
            </Link>
          </div>
          <div className={HERO_IMAGE_WRAPPER}>
            <img
              src={HERO.image}
              alt={HERO.imageAlt}
              className={HERO_IMAGE}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export const Hero = memo(HeroComponent);

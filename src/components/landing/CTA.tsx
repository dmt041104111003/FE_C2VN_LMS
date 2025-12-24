import { memo } from 'react';
import { CTA } from '@/constants';
import {
  CTA_SECTION,
  CTA_CONTAINER,
  CTA_GRID,
  CTA_CELL_1,
  CTA_CELL_2,
  CTA_CELL_3,
  CTA_CELL_4,
  CTA_CELL_5,
  CTA_CELL_6,
  CTA_CELL_7,
  CTA_CELL_8,
  CTA_CELL_9,
  CTA_TITLE,
  CTA_DESC,
} from './landing.styles';

function CTAComponent() {
  return (
    <section className={CTA_SECTION}>
      <div className={CTA_CONTAINER}>
        <div className={CTA_GRID}>
          <div className={CTA_CELL_1} />
          <div className={CTA_CELL_2} />
          <div className={CTA_CELL_3}>
            <h2 className={CTA_TITLE}>
              {CTA.title}
            </h2>
            <p className={CTA_DESC}>
              {CTA.description}
            </p>
          </div>
          <div className={CTA_CELL_4} />
          <div className={CTA_CELL_5} />
          <div className={CTA_CELL_6} />
          <div className={CTA_CELL_7} />
          <div className={CTA_CELL_8} />
          <div className={CTA_CELL_9} />
        </div>
      </div>
    </section>
  );
}

export const CTASection = memo(CTAComponent);

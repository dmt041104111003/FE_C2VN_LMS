'use client';

import { memo, useState } from 'react';
import {
  FEATURES,
  FEATURES_SECTION_TITLE,
  FEATURES_IMAGES,
} from '@/constants';
import { Lightbox } from '@/components/ui';
import {
  FEATURES_SECTION,
  FEATURES_CONTAINER,
  FEATURES_TITLE,
  FEATURES_GRID,
  FEATURES_CARD_BASE,
  FEATURES_CARD_1,
  FEATURES_CARD_2,
  FEATURES_CARD_3,
  FEATURES_CARD_4,
  FEATURES_CARD_OVERLAY,
  FEATURES_CARD_CONTENT,
  FEATURES_CARD_TITLE,
  FEATURES_CARD_DESC,
} from './landing.styles';

const CARD_BG_STYLES = [
  FEATURES_CARD_1,
  FEATURES_CARD_2,
  FEATURES_CARD_3,
  FEATURES_CARD_4,
];

function FeaturesComponent() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setCurrentIndex(null);
  };

  const goToPrev = () => {
    if (currentIndex !== null) {
      setCurrentIndex((currentIndex - 1 + FEATURES_IMAGES.length) % FEATURES_IMAGES.length);
    }
  };

  const goToNext = () => {
    if (currentIndex !== null) {
      setCurrentIndex((currentIndex + 1) % FEATURES_IMAGES.length);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className={FEATURES_SECTION}>
      <div className={FEATURES_CONTAINER}>
        <h2 className={FEATURES_TITLE}>
          {FEATURES_SECTION_TITLE}
        </h2>
        <div className={FEATURES_GRID}>
          {FEATURES.map((item, index) => (
            <div
              key={index}
              className={`${FEATURES_CARD_BASE} ${CARD_BG_STYLES[index]}`}
              onClick={() => openLightbox(index)}
            >
              <div className={FEATURES_CARD_OVERLAY} />
              <div className={FEATURES_CARD_CONTENT}>
                <h3 className={FEATURES_CARD_TITLE}>
                  {item.title}
                </h3>
                <p className={FEATURES_CARD_DESC}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {currentIndex !== null && (
        <Lightbox
          images={[...FEATURES_IMAGES]}
          currentIndex={currentIndex}
          onClose={closeLightbox}
          onPrev={goToPrev}
          onNext={goToNext}
          onGoTo={goToSlide}
        />
      )}
    </section>
  );
}

export const Features = memo(FeaturesComponent);

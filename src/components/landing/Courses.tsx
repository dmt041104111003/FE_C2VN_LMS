'use client';

import { memo, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { Button, Badge, CardModal } from '@/components/ui';
import {
  ROUTES,
  COURSES_LABELS,
  COURSES_IMAGES,
} from '@/constants';
import type { Course } from '@/types/course';

const COURSES: Course[] = [];
import {
  COURSES_SECTION,
  COURSES_CONTAINER,
  COURSES_HEADER,
  COURSES_HEADER_TITLE,
  COURSES_GRID,
  COURSES_CARD_BASE,
  COURSES_CARD_1,
  COURSES_CARD_2,
  COURSES_CARD_3,
  COURSES_CARD_IMAGE,
  COURSES_CARD_GRADIENT,
  COURSES_CARD_CONTENT,
  COURSES_CARD_BADGE,
  COURSES_CARD_TITLE,
} from './landing.styles';

const CARD_GRID_STYLES = [COURSES_CARD_1, COURSES_CARD_2, COURSES_CARD_3] as const;

function CoursesComponent() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const modalItems = useMemo(() => 
    COURSES.slice(0, 3).map((course, index) => ({
      image: COURSES_IMAGES[index] || course.thumbnail,
      tag: course.tags?.[0] || '',
      title: course.title,
      subtitle: `${COURSES_LABELS.instructorPrefix} ${course.instructorName}`,
      price: course.price,
      currency: course.currency,
      discount: course.discount,
      buttonText: COURSES_LABELS.viewDetail,
      buttonHref: `/courses/${course.id}`,
    })),
  []);

  const openModal = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const closeModal = useCallback(() => {
    setCurrentIndex(null);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex(prev => 
      prev !== null ? (prev - 1 + modalItems.length) % modalItems.length : null
    );
  }, [modalItems.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => 
      prev !== null ? (prev + 1) % modalItems.length : null
    );
  }, [modalItems.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <section className={COURSES_SECTION}>
      <div className={COURSES_CONTAINER}>
        <div className={COURSES_HEADER}>
          <h2 className={COURSES_HEADER_TITLE}>{COURSES_LABELS.sectionTitle}</h2>
          <Link href={ROUTES.COURSES}>
            <Button variant="ghost">{COURSES_LABELS.viewAll}</Button>
          </Link>
        </div>
        <div className={COURSES_GRID}>
          {COURSES.slice(0, 3).map((course, index) => (
            <div
              key={course.id}
              className={`${COURSES_CARD_BASE} ${CARD_GRID_STYLES[index]} cursor-pointer`}
              onClick={() => openModal(index)}
            >
              <img
                src={COURSES_IMAGES[index] || course.thumbnail}
                alt={course.title}
                className={COURSES_CARD_IMAGE}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
              <div className={COURSES_CARD_GRADIENT} />
              <div className={COURSES_CARD_CONTENT}>
                <Badge variant="accent" className={COURSES_CARD_BADGE}>
                  {course.tags?.[0] || ''}
                </Badge>
                <h3 className={COURSES_CARD_TITLE}>{course.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {currentIndex !== null && (
        <CardModal
          items={modalItems}
          currentIndex={currentIndex}
          onClose={closeModal}
          onPrev={goToPrev}
          onNext={goToNext}
          onGoTo={goToSlide}
        />
      )}
    </section>
  );
}

export const Courses = memo(CoursesComponent);

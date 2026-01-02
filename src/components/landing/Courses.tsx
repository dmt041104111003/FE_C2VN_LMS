'use client';

import { memo, useState, useCallback, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Button, Badge, CardModal } from '@/components/ui';
import {
  ROUTES,
  COURSES_LABELS,
  COURSES_IMAGES,
} from '@/constants';
import type { Course } from '@/types/course';
import { courseService } from '@/services';
import { getUserAvatar } from '@/utils/avatar';
import {
  COURSES_SECTION,
  COURSES_CONTAINER,
  COURSES_HEADER,
  COURSES_HEADER_TITLE,
  COURSES_GRID_1,
  COURSES_GRID_2,
  COURSES_GRID_3,
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

const CARD_GRID_STYLES_3 = [COURSES_CARD_1, COURSES_CARD_2, COURSES_CARD_3] as const;

const getGridClass = (count: number) => {
  if (count === 1) return COURSES_GRID_1;
  if (count === 2) return COURSES_GRID_2;
  return COURSES_GRID_3;
};

const getCardStyle = (index: number, count: number) => {
  if (count >= 3) return CARD_GRID_STYLES_3[index] || '';
  return ''; 
};

function CoursesComponent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchLatestCourses = async () => {
      try {
        const data = await courseService.getPublishedCourses();
        const mapped: Course[] = ((data || []) as Record<string, unknown>[])
          .map(c => {
            const instructorEmail = c.instructorEmail ? String(c.instructorEmail) : undefined;
            const instructorWalletAddress = c.instructorWalletAddress ? String(c.instructorWalletAddress) : undefined;
            const instructorName = String(c.instructorName || '');
            
            const instructorAvatar = (instructorWalletAddress || instructorEmail || instructorName)
              ? getUserAvatar({ walletAddress: instructorWalletAddress, email: instructorEmail, fullName: instructorName })
              : '/loading.png';

            return {
              id: String(c.id || ''),
              slug: String(c.slug || ''),
              title: String(c.title || ''),
              description: String(c.description || ''),
              thumbnail: String(c.thumbnail || c.imageUrl || ''),
              price: Number(c.price) || 0,
              currency: String(c.currency || 'ADA'),
              discount: c.discount != null ? Number(c.discount) : undefined,
              discountEndTime: c.discountEndTime ? String(c.discountEndTime) : undefined,
              instructorName,
              instructorAvatar,
              tags: Array.isArray(c.courseTags)
                ? (c.courseTags as { name?: string }[]).map(t => String(t.name || ''))
                : [],
              createdAt: String(c.createdAt || ''),
            } as Course;
          })
          .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
          .slice(0, 3);
        setCourses(mapped);
      } catch {
        setCourses([]);
      }
    };
    fetchLatestCourses();
  }, []);

  const modalItems = useMemo(() => 
    courses.map((course, index) => ({
      image: COURSES_IMAGES[index] || course.thumbnail,
      tag: course.tags?.[0] || '',
      title: course.title,
      subtitle: `${COURSES_LABELS.instructorPrefix} ${course.instructorName}`,
      price: course.price,
      currency: course.currency,
      discount: course.discount,
      discountEndTime: course.discountEndTime,
      buttonText: COURSES_LABELS.viewDetail,
      buttonHref: `/courses/${course.slug || course.id}`,
    })),
  [courses]);

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
        <div className={getGridClass(courses.length)}>
          {courses.map((course, index) => (
            <div
              key={course.id}
              className={`${COURSES_CARD_BASE} ${getCardStyle(index, courses.length)} cursor-pointer`}
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

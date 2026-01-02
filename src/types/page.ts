export interface CourseIdPageProps {
  params: { courseId: string };
}

export interface IdPageProps {
  params: { id: string };
}

export interface AsyncIdPageProps {
  params: Promise<{ id: string }>;
}

export interface SlugPageProps {
  params: { slug: string };
}


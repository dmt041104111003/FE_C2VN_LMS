import type { CourseFormData, Chapter, Quiz } from '@/types/course-create';
import type { CourseCreationRequest, ChapterRequest, LectureRequest, TestRequest, QuestionRequest, AnswerRequest } from '@/services/course';

export const generateId = () => Math.random().toString(36).slice(2, 9);

const normalizeVideoUrl = (url?: string): string => {
  if (!url) return '';
  const trimmed = url.trim();
  if (!trimmed) return '';
  
  const patterns = [
    /(?:youtube\.com|youtu\.be).*[?&]v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/live\/([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  
  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match?.[1]) {
      return `https://www.youtube.com/watch?v=${match[1]}`;
    }
  }
  
  return trimmed;
};

export const isFormEmpty = (form: CourseFormData): boolean => {
  const hasTitle = form.title.trim() !== '';
  const hasDescription = form.description.trim() !== '';
  
  const hasChapterContent = form.chapters.some(chapter => 
    chapter.title.trim() !== '' || 
    chapter.lectures.some(lecture => 
      lecture.title.trim() !== '' || 
      lecture.content.trim() !== '' || 
      lecture.videoUrl.trim() !== ''
    )
  );
  
  const hasQuizContent = form.quizzes.some(quiz => 
    quiz.title.trim() !== '' ||
    quiz.questions.some(q => q.question.trim() !== '')
  );

  return !hasTitle && !hasDescription && !hasChapterContent && !hasQuizContent;
};

export const normalizeFormData = (data: Partial<CourseFormData>): CourseFormData => {
  const chapters: Chapter[] = (data.chapters || []).map((ch) => ({
    id: ch.id || generateId(),
    title: ch.title || '',
    lectures: (ch.lectures || []).map((lec) => ({
      id: lec.id || generateId(),
      title: lec.title || '',
      content: lec.content || '',
      videoUrl: normalizeVideoUrl(lec.videoUrl),
      duration: lec.duration,
      previewFree: lec.previewFree ?? false,
    })),
  }));

  const quizzes: Quiz[] = (data.quizzes || []).map((quiz) => ({
    id: quiz.id || generateId(),
    title: quiz.title || '',
    type: quiz.type || 'final',
    chapterId: quiz.chapterId,
    passScore: quiz.passScore ?? 0,
    questions: (quiz.questions || []).map((q) => ({
      id: q.id || generateId(),
      question: q.question || '',
      options: q.options || ['', '', '', ''],
      correctIndexes: q.correctIndexes || [],
      explanation: q.explanation || '',
    })),
  }));

  return {
    title: data.title || '',
    description: data.description || '',
    videoUrl: normalizeVideoUrl(data.videoUrl),
    price: data.price ?? 0,
    status: data.status || 'draft',
    receiverAddress: data.receiverAddress || '',
    discount: data.discount,
    discountEndTime: data.discountEndTime,
    chapters,
    quizzes,
  };
};

const mapQuizToTest = (quiz: Quiz, isEditMode: boolean): TestRequest => ({
  id: isEditMode && quiz.id && !isNaN(Number(quiz.id)) ? quiz.id : undefined,
  title: quiz.title,
  durationMinutes: 30,
  passScore: quiz.passScore ?? 60,
  questions: quiz.questions.map((q, idx) => ({
    id: isEditMode && q.id && !isNaN(Number(q.id)) ? q.id : undefined,
    content: q.question,
    score: 10,
    orderIndex: idx,
    explanation: q.explanation || undefined,
    answers: q.options.map((optionText, optIdx) => ({
      content: optionText,
      correct: q.correctIndexes.includes(optIdx),
    } as AnswerRequest)),
  } as QuestionRequest)),
});

export const mapFormToApiRequest = (formData: CourseFormData, tagIds: number[], isEditMode = false): CourseCreationRequest => {
  const chapters: ChapterRequest[] = formData.chapters.map((chapter) => {
    const chapterQuizzes = formData.quizzes.filter(quiz => {
      if (quiz.type !== 'chapter') return false;
      if (quiz.chapterId === chapter.id) return true;
      return quiz.title.includes(chapter.title) || chapter.title.includes(quiz.title.replace('Quiz – ', ''));
    });
    
    return {
      id: isEditMode && chapter.id && !isNaN(Number(chapter.id)) ? chapter.id : undefined,
      title: chapter.title,
      lectures: chapter.lectures.map(lecture => ({
        id: isEditMode && lecture.id && !isNaN(Number(lecture.id)) ? lecture.id : undefined,
        title: lecture.title,
        description: lecture.content,
        videoUrl: lecture.videoUrl,
        duration: lecture.duration || 0,
        previewFree: lecture.previewFree,
      } as LectureRequest)),
      tests: chapterQuizzes.length > 0 ? chapterQuizzes.map(q => mapQuizToTest(q, isEditMode)) : undefined,
    };
  });

  const courseTests = formData.quizzes
    .filter(quiz => quiz.type === 'final' || !quiz.type)
    .map(q => mapQuizToTest(q, isEditMode));

  return {
    title: formData.title,
    description: formData.description,
    videoUrl: formData.videoUrl,
    draft: formData.status === 'draft',
    price: formData.price,
    discount: formData.discount,
    discountEndTime: formData.discountEndTime,
    courseType: formData.price > 0 ? 'PAID' : 'FREE',
    chapters,
    courseTests,
    tagIds: tagIds.length > 0 ? tagIds : undefined,
    paymentMethods: formData.price > 0 
      ? [{ paymentMethodId: 'CARDANO_WALLET', receiverAddress: formData.receiverAddress }]
      : [{ paymentMethodId: 'FREE_ENROLL', receiverAddress: '' }],
  };
};

export const formDataToJson = (formData: CourseFormData): string => {
  const data = {
    title: formData.title,
    description: formData.description,
    videoUrl: formData.videoUrl,
    price: formData.price,
    status: formData.status,
    receiverAddress: formData.receiverAddress,
    discount: formData.discount,
    discountEndTime: formData.discountEndTime,
    chapters: formData.chapters.map(ch => ({
      ...ch,
      lectures: ch.lectures.map(lec => ({
        id: lec.id,
        title: lec.title,
        content: lec.content,
        videoUrl: lec.videoUrl,
        duration: lec.duration,
        previewFree: lec.previewFree,
      })),
    })),
    quizzes: formData.quizzes.map(q => ({
      ...q,
      passScore: q.passScore,
      questions: q.questions.map(qu => ({
        id: qu.id,
        question: qu.question,
        options: qu.options,
        correctIndexes: qu.correctIndexes,
        explanation: qu.explanation,
      })),
    })),
  };
  return JSON.stringify(data, null, 2);
};


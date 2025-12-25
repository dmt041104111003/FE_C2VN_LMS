export interface FeatureCardProps {
  title: string;
  description: string;
}

export interface LandingCourseCardProps {
  id: string;
  title: string;
  instructor: string;
  price: number;
  tag: string;
  image?: string;
}

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  image: string;
}

export interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export interface DemoFormData {
  name: string;
  email: string;
  content: string;
}


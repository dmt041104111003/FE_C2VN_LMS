import {
  Header,
  Footer,
} from '@/components/ui';

import {
  Hero,
  Features,
  Courses,
  CTASection,
  Demo,
} from '@/components/landing';

const PAGE = 'min-h-screen flex flex-col bg-[var(--bg)]';

const SPACER = 'h-14 sm:h-16';

const MAIN = 'flex-1';

export default function HomePage() {
  return (
    <div className={PAGE}>
      <Header />

      <div className={SPACER} />

      <main className={MAIN}>
        <Hero />
        <Features />
        <Courses />
        <CTASection />
        <Demo />
      </main>

      <Footer />
    </div>
  );
}

import Marquee from '@/components/Marquee';
import Hero from '@/components/Hero';
import ProfileCard from '@/components/ProfileCard';
import CurrentFocus from '@/components/CurrentFocus';
import ProfileQuote from '@/components/ProfileQuote';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Publications from '@/components/Publications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Marquee />
      <Hero />
      <div className="page-wrap">
        <div className="col-left">
          <ProfileCard />
          <CurrentFocus />
          <ProfileQuote />
        </div>
        <div className="col-right">
          <Projects />
          <Experience />
          <Publications />
          <Skills />
          <Contact />
        </div>
      </div>
      <Footer />
    </>
  );
}

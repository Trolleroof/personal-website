import TopBar from '@/components/TopBar';
import Marquee from '@/components/Marquee';
import Hero from '@/components/Hero';
import ProfileCard from '@/components/ProfileCard';
import NowPlaying from '@/components/NowPlaying';
import MoodStats from '@/components/MoodStats';
import Skills from '@/components/Skills';
import Interests from '@/components/Interests';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Guestbook from '@/components/Guestbook';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <TopBar />
      <Marquee />
      <Hero />
      <div className="page-wrap">
        <div className="col-left">
          <ProfileCard />
          <NowPlaying />
          <MoodStats />
        </div>
        <div className="col-right">
          <Interests />
          <Projects />
          <Skills />
          <Experience />
          <Guestbook />
          <Contact />
        </div>
      </div>
      <Footer />
    </>
  );
}

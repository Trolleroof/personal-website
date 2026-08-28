import type { Metadata } from 'next';
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
import JsonLd from '@/components/JsonLd';
import { PERSON_ID, WEBSITE_ID, abs } from '@/lib/site';
import { breadcrumbSchema, graph } from '@/lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const profilePageSchema = {
  '@type': 'ProfilePage',
  '@id': abs('/'),
  url: abs('/'),
  name: 'Nikhil Prabhu — portfolio',
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': PERSON_ID },
  mainEntity: { '@id': PERSON_ID },
};

export default function Home() {
  return (
    <>
      <JsonLd json={graph(profilePageSchema, breadcrumbSchema([{ name: 'Home', path: '/' }]))} />
      <Marquee />
      <h1 className="sr-only">
        Nikhil Prabhu — computer science student at UC San Diego building agents, robotics
        interfaces, and robot-learning systems
      </h1>
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
    </>
  );
}

import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import HomeView from '@/components/home/HomeView';
import { getBlogPosts } from '@/lib/blog';
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
  const posts = getBlogPosts().map((p) => ({ slug: p.slug, title: p.title, date: String(p.date) }));
  return (
    <>
      <JsonLd json={graph(profilePageSchema, breadcrumbSchema([{ name: 'Home', path: '/' }]))} />
      <HomeView posts={posts} />
    </>
  );
}

import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from '@/lib/og';
import { AUTHOR } from '@/lib/site';

export const alt = `Projects — ${AUTHOR.name}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    eyebrow: 'Projects',
    title: 'Things I have built',
    subtitle: 'Hackathon builds, robotics experiments, and systems projects.',
  });
}

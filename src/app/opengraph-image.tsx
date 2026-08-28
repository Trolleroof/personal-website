import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from '@/lib/og';
import { AUTHOR } from '@/lib/site';

export const alt = `${AUTHOR.name} — Software Engineer, CS @ UC San Diego`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    eyebrow: 'Portfolio',
    title: AUTHOR.name,
    subtitle: 'Agents, robotics UIs, and systems that ship. CS @ UC San Diego.',
    footer: 'Software Engineer · Robotics',
  });
}

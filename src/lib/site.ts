/** Canonical site constants — single source for URLs and author identity. */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://nikhilprabhu.tech');

/** Absolute URL for a site-relative path, e.g. `abs('/blog')`. */
export function abs(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export const AUTHOR = {
  name: 'Nikhil Prabhu',
  handle: 'Trolleroof',
  email: 'nikhilprabhu06@gmail.com',
  github: 'https://github.com/Trolleroof',
  linkedin: 'https://www.linkedin.com/in/nikprabhu1/',
  x: 'https://x.com/nikhilaprabhu',
  location: 'San Francisco Bay Area',
  university: 'University of California, San Diego',
} as const;

/** Brand name used for `siteName`, title templates, and structured data. */
export const SITE_NAME = AUTHOR.name;

export const SITE_DESCRIPTION =
  'Personal portfolio of Nikhil Prabhu — agents, robotics UIs, and systems that ship. CS @ UC San Diego.';

/** Every profile URL crawlers should treat as the same entity. */
export const SAME_AS = [AUTHOR.github, AUTHOR.linkedin, AUTHOR.x] as const;

/** Stable structured-data node ids, so pages can reference one shared entity. */
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Structured-data node reused as the `author`/`publisher` reference across pages. */
export const personRef = { '@type': 'Person', '@id': PERSON_ID, name: AUTHOR.name } as const;

/** Renders a `<script type="application/ld+json">` payload safely. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

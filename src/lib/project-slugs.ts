import { PROFILE, type Project } from '@/lib/data';

/** URL-safe slug from a project display name (e.g. "Apollo Labs" → "apollo-labs"). */
export function projectSlug(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const PROJECT_HASH_PREFIX = 'project/';

/** Hash for deep-linking a project modal, e.g. `#project/sodium`. */
export function projectDetailHash(slug: string): string {
  return `#${PROJECT_HASH_PREFIX}${slug}`;
}

export function parseProjectDetailHash(hash: string): string | null {
  const raw = hash.replace(/^#/, '').toLowerCase();
  if (!raw.startsWith(PROJECT_HASH_PREFIX)) return null;
  const slug = raw.slice(PROJECT_HASH_PREFIX.length);
  return slug.length > 0 ? slug : null;
}

/** Project with detail modal content, matched by URL slug. */
export function findProjectBySlug(slug: string): Project | undefined {
  return PROFILE.projects.find((p) => projectSlug(p.name) === slug && p.detail);
}

export function scrollToProjectsSection(): void {
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

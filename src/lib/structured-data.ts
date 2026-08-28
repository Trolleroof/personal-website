/** Schema.org JSON-LD builders. Node `@id`s are stable so graphs can cross-reference. */

import { PROFILE, getAllProjects, type Project } from '@/lib/data';
import type { BlogPostMeta } from '@/lib/blog';
import { projectSlug } from '@/lib/project-slugs';
import { AUTHOR, PERSON_ID, SAME_AS, SITE_DESCRIPTION, SITE_URL, WEBSITE_ID, abs } from '@/lib/site';

type Json = Record<string, unknown>;

function knowsAbout(): string[] {
  const topics = new Set<string>([
    'Robotics',
    'Reinforcement Learning',
    'Robot Learning',
    'Autonomous Systems',
    'Agentic Software',
    'Computer Vision',
    'Imitation Learning',
    'World Models',
    'Human-Computer Interaction',
  ]);
  for (const category of PROFILE.skills) {
    for (const item of category.items) topics.add(item.name);
  }
  return [...topics];
}

export function personSchema(): Json {
  const awards = getAllProjects()
    .map((project) => project.detail?.award)
    .filter((award): award is string => Boolean(award));

  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: AUTHOR.name,
    alternateName: AUTHOR.handle,
    url: SITE_URL,
    mainEntityOfPage: SITE_URL,
    image: abs('/profile-avatar.png'),
    jobTitle: 'Computer Science Student',
    description: SITE_DESCRIPTION,
    disambiguatingDescription: PROFILE.byline,
    email: `mailto:${AUTHOR.email}`,
    knowsAbout: knowsAbout(),
    award: awards,
    homeLocation: { '@type': 'Place', name: AUTHOR.location },
    sameAs: [...SAME_AS],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: AUTHOR.university,
      sameAs: 'https://ucsd.edu',
    },
    worksFor: PROFILE.experience.map((job) => ({
      '@type': 'Organization',
      name: job.organization,
    })),
    subjectOf: PROFILE.publications.map((pub) => ({
      '@type': 'ScholarlyArticle',
      name: pub.title,
      headline: pub.title,
      url: pub.url,
      datePublished: pub.date,
      isPartOf: { '@type': 'PublicationEvent', name: pub.conference },
      author: { '@id': PERSON_ID },
    })),
  };
}

export function webSiteSchema(): Json {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: `${AUTHOR.name} — portfolio`,
    description: SITE_DESCRIPTION,
    inLanguage: 'en-US',
    publisher: { '@id': PERSON_ID },
    author: { '@id': PERSON_ID },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  };
}

export function projectSchema(project: Project): Json {
  const slug = projectSlug(project.name);
  const codeRepository = project.links.find((link) => link.href.includes('github.com'))?.href;

  return {
    '@type': 'SoftwareApplication',
    '@id': abs(`/projects#${slug}`),
    name: project.name,
    url: abs(`/#project/${slug}`),
    description: project.detail?.overview ?? project.desc,
    abstract: project.desc,
    applicationCategory: 'DeveloperApplication',
    keywords: project.tags.join(', '),
    author: { '@id': PERSON_ID },
    creator: { '@id': PERSON_ID },
    ...(codeRepository ? { codeRepository } : {}),
    ...(project.detail?.award ? { award: project.detail.award } : {}),
  };
}

export function projectsPageSchema(projects: Project[]): Json {
  return {
    '@type': 'CollectionPage',
    '@id': abs('/projects'),
    url: abs('/projects'),
    name: 'Projects',
    description: 'Hackathon builds, robotics experiments, and systems projects by Nikhil Prabhu.',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': PERSON_ID },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: projectSchema(project),
      })),
    },
  };
}

export function blogPostingSchema(post: BlogPostMeta, wordCount?: number): Json {
  return {
    '@type': 'BlogPosting',
    '@id': abs(`/blog/${post.slug}`),
    mainEntityOfPage: abs(`/blog/${post.slug}`),
    url: abs(`/blog/${post.slug}`),
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'en-US',
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    isPartOf: { '@id': `${SITE_URL}/blog#blog` },
    ...(post.thumbnail ? { image: abs(post.thumbnail) } : {}),
    ...(wordCount ? { wordCount } : {}),
    ...(post.links?.length
      ? { citation: post.links.map((link) => ({ '@type': 'CreativeWork', name: link.label, url: link.href })) }
      : {}),
  };
}

export function blogSchema(posts: BlogPostMeta[]): Json {
  return {
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog#blog`,
    url: abs('/blog'),
    name: `${AUTHOR.name} — blog`,
    description: 'Notes, build logs, and research writeups on robot learning, agents, and systems.',
    inLanguage: 'en-US',
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
    blogPost: posts.map((post) => blogPostingSchema(post)),
  };
}

/** Wraps nodes in a single `@graph` document — one script tag per page. */
export function graph(...nodes: Json[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
}

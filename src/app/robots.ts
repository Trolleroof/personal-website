import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/** Answer-engine and AI-search crawlers explicitly welcomed. */
const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
  'meta-externalagent',
  'DuckAssistBot',
  'Amazonbot',
  'cohere-ai',
  'CCBot',
  'Bingbot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/llms.txt', '/llms-full.txt', '/resume.pdf'],
      },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL.replace(/^https:\/\//, ''),
  };
}

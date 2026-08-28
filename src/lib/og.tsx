import { ImageResponse } from 'next/og';
import { AUTHOR, SITE_URL } from '@/lib/site';

/** Shared dimensions/content type for every `opengraph-image` + `twitter-image` route. */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = 'image/png';

const PINK = '#c0392b';
const BLUE = '#336699';

type OgCardOptions = {
  /** Small uppercase label in the panel's title bar, e.g. "Blog". */
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Bottom-left label. Defaults to the author's name; override to avoid
   *  repeating a title that is already the name. */
  footer?: string;
};

/**
 * Renders the site's social card: a MySpace-style panel matching the live theme.
 * Satori supports flexbox only, so every container declares `display: flex`.
 */
export function renderOgCard({ eyebrow, title, subtitle, footer }: OgCardOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #b0a8a4, #c1b6b1, #aaa2a0)',
          padding: 48,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            background: '#f8f6f5',
            border: '2px solid #8b1a10',
            boxShadow: '8px 8px 0 rgba(0,0,0,0.25)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'linear-gradient(to bottom, #d04030, #8b1a10)',
              color: '#fff',
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: 'uppercase',
              padding: '16px 32px',
            }}
          >
            {eyebrow}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'center',
              padding: '48px 56px',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: title.length > 48 ? 62 : 78,
                fontWeight: 800,
                color: BLUE,
                lineHeight: 1.15,
                letterSpacing: -2,
              }}
            >
              {title}
            </div>

            {subtitle ? (
              <div
                style={{
                  display: 'flex',
                  marginTop: 28,
                  fontSize: 32,
                  color: '#555',
                  lineHeight: 1.4,
                }}
              >
                {subtitle}
              </div>
            ) : null}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid #e0dbd8',
              padding: '22px 56px',
              fontSize: 28,
            }}
          >
            <div style={{ display: 'flex', color: PINK, fontWeight: 700 }}>
              {footer ?? AUTHOR.name}
            </div>
            <div style={{ display: 'flex', color: '#888' }}>
              {SITE_URL.replace(/^https?:\/\//, '')}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}

import { ImageResponse } from 'next/og';
import { AUTHOR, SITE_URL } from '@/lib/site';

/** Shared dimensions/content type for every `opengraph-image` + `twitter-image` route. */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = 'image/png';

const INK = '#eef2ff';
const ACCENT = '#c8d5ff';
const MUTED = '#93a1cc';

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
 * Renders the site's social card in the nocturnal indigo & silver-mist aesthetic.
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
          background: '#070911',
          padding: 48,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            background: '#0b0e19',
            border: '1px solid rgba(182, 196, 236, 0.16)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid rgba(196, 210, 255, 0.16)',
              color: ACCENT,
              fontSize: 26,
              fontWeight: 500,
              letterSpacing: 6,
              textTransform: 'uppercase',
              padding: '20px 44px',
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
              padding: '44px 56px',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: title.length > 48 ? 58 : 74,
                fontWeight: 600,
                color: INK,
                lineHeight: 1.15,
                letterSpacing: -1,
              }}
            >
              {title}
            </div>

            {subtitle ? (
              <div
                style={{
                  display: 'flex',
                  marginTop: 26,
                  fontSize: 30,
                  color: '#c9d3f0',
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
              borderTop: '1px solid rgba(196, 210, 255, 0.16)',
              padding: '22px 56px',
              fontSize: 26,
            }}
          >
            <div style={{ display: 'flex', color: ACCENT, fontWeight: 500 }}>
              {footer ?? AUTHOR.name}
            </div>
            <div style={{ display: 'flex', color: MUTED }}>
              {SITE_URL.replace(/^https?:\/\//, '')}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}

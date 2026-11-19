import { manuscriptFonts } from '@/app/fonts';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <div className={manuscriptFonts}>{children}</div>;
}

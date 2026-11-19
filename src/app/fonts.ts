import { EB_Garamond, Tiro_Devanagari_Sanskrit } from 'next/font/google';

export const garamond = EB_Garamond({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600'],
  variable: '--font-garamond',
  display: 'swap',
});

export const tiro = Tiro_Devanagari_Sanskrit({
  subsets: ['devanagari', 'latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-devanagari',
  display: 'swap',
});

export const manuscriptFonts = `${garamond.variable} ${tiro.variable}`;

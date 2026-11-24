import Image from 'next/image';
import s from './home.module.css';

interface MarginPlate {
  src: string;
  w: number;
  h: number;
  title: string;
  className: string;
}

const LEFT: readonly MarginPlate[] = [
  {
    src: '/gita/Bhagavad_Gita__a_19th_century_manuscript.jpg',
    w: 389,
    h: 640,
    title: 'Bhagavad Gita — 19th-century illuminated Sanskrit manuscript',
    className: s.plateTiltA,
  },
  {
    src: '/gita/lacma-gita-govinda.jpg',
    w: 720,
    h: 556,
    title: 'Companion Persuading Radha as Krishna Flutes — Kangra school, ca. 1825 (LACMA)',
    className: `${s.plateTiltB} ${s.gitaArtLift}`,
  },
  {
    src: '/gita/vishnu-vishvarupa.jpg',
    w: 497,
    h: 720,
    title: 'Vishvarupa (The Cosmic Form) — Jaipur miniature, 19th century',
    className: s.plateTiltC,
  },
  {
    src: '/gita/brooklyn-vishvarupa.jpg',
    w: 720,
    h: 453,
    title: 'Vishvarupa: The Cosmic Form of Krishna — Indian miniature, 18th–19th century (Brooklyn Museum)',
    className: s.plateTiltD,
  },
  {
    src: '/gita/krishna-arjuna-gita.jpg',
    w: 494,
    h: 805,
    title: 'Krishna and Arjuna at Kurukshetra — Indian miniature, 18th–19th century',
    className: s.plateTiltE,
  },
];

const RIGHT: readonly MarginPlate[] = [
  {
    src: '/gita/BhagavadGita-19th-century-Illustrated-Sanskrit-Chapter_1.20.21.jpg',
    w: 500,
    h: 303,
    title: 'Bhagavad Gita Chapter 1.20–21 — 19th-century illustrated Sanskrit folio',
    className: s.plateTiltD,
  },
  {
    src: '/gita/chariot-krishna-arjuna.png',
    w: 292,
    h: 370,
    title: 'Krishna and Arjuna in Chariot — 19th-century illuminated Sanskrit Gita folio',
    className: s.plateTiltA,
  },
  {
    src: '/gita/met-arjuna-battle.jpg',
    w: 456,
    h: 720,
    title: 'Arjuna Battles Raja Tamradhvaja — Folio from a Razmnama, ca. 1616–17 (The Metropolitan Museum of Art)',
    className: s.plateTiltE,
  },
  {
    src: '/gita/krishna-kaliya-kangra.jpg',
    w: 720,
    h: 540,
    title: "Kaliya's Wives and Krishna — Kangra school, ca. 1785–90",
    className: s.plateTiltB,
  },
  {
    src: '/gita/bhima-dhannu-1598.jpg',
    w: 401,
    h: 720,
    title: 'Bhima Kills Kichaka — signed by Dhannu, Mughal miniature, ca. 1598–99',
    className: `${s.plateTiltC} ${s.gitaArtDim}`,
  },
];

export function GitaMarginLeft() {
  return (
    <aside className={`${s.gitaCol} ${s.gitaColLeft}`} aria-hidden="true">
      {LEFT.map((img) => (
        <Image
          key={img.src}
          src={img.src}
          alt=""
          width={img.w}
          height={img.h}
          className={`${s.gitaArt} ${img.className}`}
          loading="lazy"
        />
      ))}
    </aside>
  );
}

export function GitaMarginRight() {
  return (
    <aside className={`${s.gitaCol} ${s.gitaColRight}`} aria-hidden="true">
      {RIGHT.map((img) => (
        <Image
          key={img.src}
          src={img.src}
          alt=""
          width={img.w}
          height={img.h}
          className={`${s.gitaArt} ${img.className}`}
          loading="lazy"
        />
      ))}
    </aside>
  );
}

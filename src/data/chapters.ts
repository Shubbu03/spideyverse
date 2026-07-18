import acrossBanner from '../assets/films/across-the-spider-verse.jpg'
import beyondBanner from '../assets/films/beyond-the-spider-verse.jpg'
import intoBanner from '../assets/films/into-the-spider-verse.jpg'

export interface FilmFact {
  label: string
  value: string
}

export interface Film {
  slug: string
  number: string
  kicker: string
  title: string
  fullTitle: string
  marker: string
  copy: string
  color: string
  banner: string
  bannerAlt: string
  bannerPosition: string
  release: string
  status: string
  tagline: string
  synopsisHeading: string
  synopsis: string
  perspective: string
  facts: readonly FilmFact[]
  sourceUrl: string
}

export const films = [
  {
    slug: 'into-the-spider-verse',
    number: '01',
    kicker: 'Into / 2018',
    title: 'Into the Spider-Verse',
    fullTitle: 'Spider-Man: Into the Spider-Verse',
    marker: 'Chapter I',
    copy: 'Miles Morales is bitten and forced to discover what becoming Spider-Man looks like in his own style.',
    color: '#f20d3a',
    banner: intoBanner,
    bannerAlt: 'Miles Morales falling through a vivid cityscape in Into the Spider-Verse artwork',
    bannerPosition: 'center 42%',
    release: 'December 14, 2018',
    status: 'Released',
    tagline: 'Anyone can wear the mask.',
    synopsisHeading: 'The first leap belongs to Miles.',
    synopsis: 'Brooklyn teenager Miles Morales is still trying to find his footing when a radioactive spider bite and a ruptured dimensional experiment pull several Spider-People into his world. To get everyone home, Miles has to stop imitating the heroes around him and discover the version of Spider-Man only he can become.',
    perspective: 'The film treats comic-book language as motion: offset colors, halftone textures, visible linework and changing frame rates all become part of Miles’s emotional journey.',
    facts: [
      { label: 'Release', value: 'December 14, 2018' },
      { label: 'Directed by', value: 'Bob Persichetti, Peter Ramsey, Rodney Rothman' },
      { label: 'Screenplay', value: 'Phil Lord, Rodney Rothman' },
      { label: 'Featuring', value: 'Shameik Moore, Hailee Steinfeld, Jake Johnson, Mahershala Ali' },
      { label: 'Recognition', value: 'Academy Award winner — Best Animated Feature' },
    ],
    sourceUrl: 'https://www.sonypicturesanimation.com/projects/films/spider-man-spider-verse',
  },
  {
    slug: 'across-the-spider-verse',
    number: '02',
    kicker: 'Across / 2023',
    title: 'Across the Spider-Verse',
    fullTitle: 'Spider-Man: Across the Spider-Verse',
    marker: 'Chapter II',
    copy: 'Miles follows Gwen through the multiverse and collides with the Spider Society, its leader, and its rules.',
    color: '#18d8ff',
    banner: acrossBanner,
    bannerAlt: 'Miles Morales and Gwen Stacy surrounded by Spider-People in Across the Spider-Verse artwork',
    bannerPosition: 'center 46%',
    release: 'June 2, 2023',
    status: 'Released',
    tagline: 'It’s how you wear the mask that matters.',
    synopsisHeading: 'A wider universe. A harder choice.',
    synopsis: 'After reuniting with Gwen Stacy, Miles is thrown across a multiverse protected by the Spider Society. Their leader, Miguel O’Hara, believes every Spider-Person must accept the same painful pattern. Miles refuses to let someone else decide which losses are inevitable, placing him against an entire society of heroes.',
    perspective: 'Every dimension speaks in its own visual grammar, from Gwen’s watercolor world to Mumbattan’s dense hybrid city. The changing art direction makes the multiverse feel cultural and emotional, not simply geographical.',
    facts: [
      { label: 'Release', value: 'June 2, 2023' },
      { label: 'Directed by', value: 'Joaquim Dos Santos, Kemp Powers, Justin K. Thompson' },
      { label: 'Written by', value: 'Phil Lord, Christopher Miller, David Callaham' },
      { label: 'Featuring', value: 'Shameik Moore, Hailee Steinfeld, Oscar Isaac, Daniel Kaluuya' },
      { label: 'Chapter', value: 'The second film in the Spider-Verse trilogy' },
    ],
    sourceUrl: 'https://www.sonypicturesanimation.com/projects/films/spider-man-spider-verse-sequel',
  },
  {
    slug: 'beyond-the-spider-verse',
    number: '03',
    kicker: 'Beyond / 2027',
    title: 'Beyond the Spider-Verse',
    fullTitle: 'Spider-Man: Beyond the Spider-Verse',
    marker: 'Chapter III',
    copy: 'Miles searches for a way home while the Spider Society closes in and everything he loves hangs in the balance.',
    color: '#f4ef45',
    banner: beyondBanner,
    bannerAlt: 'Miles Morales in dark red and black Beyond the Spider-Verse artwork',
    bannerPosition: 'center 48%',
    release: 'June 18, 2027',
    status: 'Coming to theaters',
    tagline: 'The story moves beyond the rules.',
    synopsisHeading: 'The way home runs through the unknown.',
    synopsis: 'Hunted by Miguel O’Hara’s Spider Society and separated from the people he trusts, Miles searches the darkest reaches of the Spider-Verse for a route home. With his family fractured and endangered, the final chapter becomes a race to reunite everything he holds most dear.',
    perspective: 'The third film is still ahead, so this page stays with details Sony Pictures Animation has officially confirmed and avoids filling the unknown with fan theories.',
    facts: [
      { label: 'In theaters', value: 'June 18, 2027' },
      { label: 'Directed by', value: 'Bob Persichetti, Justin K. Thompson' },
      { label: 'Written by', value: 'Phil Lord, Christopher Miller, David Callaham' },
      { label: 'Produced by', value: 'Phil Lord, Chris Miller, Amy Pascal, Avi Arad, Jinko Gotoh' },
      { label: 'Status', value: 'The concluding chapter of the Spider-Verse trilogy' },
    ],
    sourceUrl: 'https://www.sonypicturesanimation.com/projects/films/spider-man-beyond-spider-verse',
  },
] as const satisfies readonly Film[]

export function findFilmBySlug(slug: string | undefined): Film | undefined {
  return films.find((film) => film.slug === slug)
}

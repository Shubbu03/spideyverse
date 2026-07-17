import milesArtwork from '../assets/characters/miles.png'
import gwenArtwork from '../assets/characters/gwen.png'
import hobieArtwork from '../assets/characters/hobie.png'
import miguelArtwork from '../assets/characters/miguel.png'

export const spiderPeople = [
  {
    id: 'miles',
    name: 'Miles Morales',
    earth: 'EARTH–1610',
    note: 'Invisible when nervous. Electric when it matters.',
    stat: '100% HEART',
    image: milesArtwork,
    source: 'https://www.deviantart.com/metropolis-hero1125/art/Across-the-Spider-Verse-Miles-Morales-PNG-966270285',
  },
  {
    id: 'gwen',
    name: 'Gwen Stacy',
    earth: 'EARTH–65',
    note: 'Drummer. Dimension hopper. Definitely fine.',
    stat: '4/4 TEMPO',
    image: gwenArtwork,
    source: 'https://www.deviantart.com/captain-kingsman16/art/Into-the-Spider-Verse-Spider-Gwen-1-PNG-777765097',
  },
  {
    id: 'hobie',
    name: 'Hobie Brown',
    earth: 'EARTH–138',
    note: 'Does not believe in consistency. Or labels.',
    stat: '0% RULES',
    image: hobieArtwork,
    source: 'https://www.deviantart.com/metropolis-hero1125/art/Across-the-Spider-Verse-Hobie-Brown-PNG-966270290',
  },
  {
    id: 'miguel',
    name: 'Miguel O’Hara',
    earth: 'EARTH–928',
    note: 'Runs the Society. Could use a snack and a nap.',
    stat: '99% STRESS',
    image: miguelArtwork,
    source: 'https://www.deviantart.com/metropolis-hero1125/art/Across-the-Spider-Verse-Miguel-O-Hara-PNG-966270297',
  },
] as const

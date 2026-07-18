import amIDreaming from '../assets/songs/am-i-dreaming.mp3'
import calling from '../assets/songs/calling.mp3'
import sunflower from '../assets/songs/sunflower.mp3'
import whatsUpDanger from '../assets/songs/whats-up-danger.mp3'

export const soundtrack = [
  { id: 'sunflower', title: 'Sunflower', artist: 'Post Malone & Swae Lee', movie: 'Into / 2018', src: sunflower, color: '#f4ef45' },
  { id: 'danger', title: 'What’s Up Danger', artist: 'Blackway & Black Caviar', movie: 'Into / 2018', src: whatsUpDanger, color: '#f20d3a' },
  { id: 'calling', title: 'Calling', artist: 'Metro Boomin, Swae Lee, NAV & A Boogie', movie: 'Across / 2023', src: calling, color: '#18d8ff' },
  { id: 'dreaming', title: 'Am I Dreaming', artist: 'Metro Boomin, A$AP Rocky & Roisee', movie: 'Across / 2023', src: amIDreaming, color: '#ff5ebc' },
] as const

export type TrackId = (typeof soundtrack)[number]['id']

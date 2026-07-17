export const soundtrack = [
  {
    id: 'sunflower',
    title: 'Sunflower',
    artist: 'Post Malone & Swae Lee',
    movie: 'INTO / 2018',
    spotifyId: '3KkXRkHbMCARz0aVfEt68P',
    color: '#f4ef45',
  },
  {
    id: 'danger',
    title: 'What’s Up Danger',
    artist: 'Blackway & Black Caviar',
    movie: 'INTO / 2018',
    spotifyId: '5AKgM7LuP2Bqz4fKd3ftjS',
    color: '#f20d3a',
  },
  {
    id: 'calling',
    title: 'Calling',
    artist: 'Metro Boomin, Swae Lee, NAV & A Boogie',
    movie: 'ACROSS / 2023',
    spotifyId: '5rurggqwwudn9clMdcchxT',
    color: '#18d8ff',
  },
  {
    id: 'dreaming',
    title: 'Am I Dreaming',
    artist: 'Metro Boomin, A$AP Rocky & Roisee',
    movie: 'ACROSS / 2023',
    spotifyId: '2pXyyI27MjnkBnp1Ms0hE9',
    color: '#ff5ebc',
  },
] as const

export type TrackId = (typeof soundtrack)[number]['id']

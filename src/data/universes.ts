export const universes = [
  { id: 'miles', label: 'Earth–1610', short: 'MILES', color: '#f20d3a' },
  { id: 'gwen', label: 'Earth–65', short: 'GWEN', color: '#ff5ebc' },
  { id: 'miguel', label: 'Earth–928', short: '2099', color: '#18d8ff' },
] as const

export type UniverseId = (typeof universes)[number]['id']

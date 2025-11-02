export const palette = {
  midnight: '#050114',
  deepBlue: '#1C1B4D',
  iris: '#6B5BFF',
  neonBlue: '#3F7CFF',
  cottonCandy: '#FF7BC2',
  blush: '#FF9FDD',
  white: '#FFFFFF'
};

export const gradients = {
  background: [palette.midnight, '#120A3B', palette.deepBlue],
  button: [palette.iris, palette.neonBlue],
  highlight: [palette.cottonCandy, palette.blush]
};

export const typography = {
  heading: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: palette.white
  },
  body: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.84)'
  }
};

export const spacing = {
  xs: 8,
  sm: 12,
  md: 20,
  lg: 28,
  xl: 40
};

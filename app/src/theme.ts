export const palette = {
  background: '#FDFCFB',
  surface: '#FFFFFF',
  softPeach: '#FFE9EF',
  softLavender: '#E9E4FF',
  softSky: '#E4F1FF',
  accentPink: '#FF8FC7',
  accentLilac: '#A6A0FF',
  accentCoral: '#FF8E9E',
  accentBlue: '#5AA9FF',
  textPrimary: '#161433',
  textSecondary: 'rgba(22, 20, 51, 0.66)',
  border: 'rgba(90, 169, 255, 0.14)'
};

export const gradients = {
  background: ['#FFFFFF', '#FFF3F7', '#E9F4FF'],
  button: [palette.accentCoral, palette.accentBlue],
  highlight: [palette.softPeach, palette.softSky]
};

export const typography = {
  heading: {
    fontSize: 30,
    fontWeight: '700' as const,
    color: palette.textPrimary
  },
  body: {
    fontSize: 17,
    color: palette.textSecondary
  }
};

export const spacing = {
  xs: 6,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48
};

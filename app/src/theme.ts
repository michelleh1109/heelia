export const palette = {
  background: '#FCFAFF',
  surface: '#FFFFFF',
  softPeach: '#FFE1E9',
  softLavender: '#E4DAFF',
  softSky: '#D6E7FF',
  accentPink: '#FF82BA',
  accentLilac: '#9B8CFF',
  accentCoral: '#FF9F8E',
  accentBlue: '#5B9DFF',
  textPrimary: '#1E1B34',
  textSecondary: 'rgba(30, 27, 52, 0.64)',
  border: 'rgba(30, 27, 52, 0.08)'
};

export const gradients = {
  background: [palette.surface, '#FDF0F7', '#F4F3FF'],
  button: [palette.accentPink, palette.accentLilac],
  highlight: [palette.softPeach, palette.softLavender]
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

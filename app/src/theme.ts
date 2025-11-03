export const palette = {
  white: '#FFFFFF',
  pearl: '#FFF7F2',
  blush: '#FFE6EE',
  coral: '#FF8B7C',
  softCoral: '#FFB6A9',
  lilac: '#E8E2FF',
  mist: '#9B96A7',
  slate: '#575365',
  graphite: '#2E2A3A'
};

export const gradients = {
  background: [palette.white, '#FFF2F4', '#FFE9E3'],
  button: [palette.coral, palette.softCoral],
  highlight: [palette.blush, palette.lilac]
};

export const typography = {
  heading: {
    fontFamily: '"Nunito", "Helvetica Neue", Arial, sans-serif',
    fontSize: 28,
    fontWeight: '700' as const,
    color: palette.graphite
  },
  body: {
    fontFamily: '"Nunito", "Helvetica Neue", Arial, sans-serif',
    fontSize: 16,
    color: palette.slate
  }
};

export const spacing = {
  xs: 10,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48
};

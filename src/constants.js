export const COLORS = {
	transparent: 'hsl(0deg 0% 100% / 0%)',
	almostTransparent: 'hsl(0deg 0% 100% / 25%)',
	black: '#000000',
	black75: 'hsl(0deg 0% 0% / 0.75)',
	white: '#FFFFFF',
	offwhite: '#F3F3F3',
	primaryBlue: '#17A2DF',
	red: '#FF0000',
	gray: {
		body: '#F2F2F2',
		card: '#F2F2F2',
		divider: '#CCC',
		text: '#707070',
		light: '#E6E6E6',
		tag: '#DDDDDD',
		breadcrumb: '#A5A5A5',
		dark: '#3B3B3B',
		vrscan: '#F8F8F8'
	},
	shadow: '0deg 0% 0%',
};

export const BREAKPOINTS = {
	phone: 480,
	tablet: 768,
	laptop: 1280,
};

export const QUERIES = {
	phoneAndDown: `(max-width: ${BREAKPOINTS.phone}px)`,
	tabletAndDown: `(max-width: ${BREAKPOINTS.tablet}px)`,
	laptopAndDown: `(max-width: ${BREAKPOINTS.laptop}px)`,
};

export const SPACING = {
	micro: `${8 / 16}rem`,
	small: `${16 / 16}rem`,
	medium: `${24 / 16}rem`,
	large: `${32 / 16}rem`,
	mega: `${40 / 16}rem`,
	giga: `${48 / 16}rem`,
};

export const FONTS = {
	text: {
		small: `${12 / 16}rem`,
		label: `${14 / 16}rem`,
		normal: `${16 / 16}rem`,
		large: `${20 / 16}rem`,
		mega: `${32 / 16}rem`,
		giga: `${40 / 16}rem`,
	},
	heading: {
		xl: `${40 / 16}rem`,
		large: `${32 / 16}rem`,
		normal: `${24 / 16}rem`,
		small: `${20 / 16}rem`,
	},
};

export const WEIGHTS = {
	normal: 300,
	medium: 500,
	bold: 700,
};

// generated through: https://www.joshwcomeau.com/shadow-palette/
export const SHADOWS = {
	low: `0px 0.5px 0.6px hsl(${COLORS.shadow} / 0.08),
  0px 0.9px 1.1px -0.7px hsl(${COLORS.shadow} / 0.11),
  0px 2.2px 2.8px -1.5px hsl(${COLORS.shadow} / 0.15)`,
	medium: `0px 0.5px 0.6px hsl(${COLORS.shadow} / 0.08),
  0px 2.1px 2.7px -0.5px hsl(${COLORS.shadow} / 0.11),
  0px 4.8px 6.1px -1px hsl(${COLORS.shadow} / 0.14),
  0px 11px 14px -1.5px hsl(${COLORS.shadow} / 0.16)`,
	high: `0px 0.5px 0.6px hsl(${COLORS.shadow} / 0.07),
  0px 4.1px 5.2px -0.2px hsl(${COLORS.shadow} / 0.08),
  0px 7.4px 9.4px -0.4px hsl(${COLORS.shadow} / 0.09),
  0px 11.2px 14.3px -0.6px hsl(${COLORS.shadow} / 0.1),
  -0.1px 16.1px 20.5px -0.7px hsl(${COLORS.shadow} / 0.11),
  -0.1px 22.8px 29.1px -0.9px hsl(${COLORS.shadow} / 0.12),
  -0.1px 32.1px 40.9px -1.1px hsl(${COLORS.shadow} / 0.13),
  -0.2px 44.7px 57px -1.3px hsl(${COLORS.shadow} / 0.14),
  -0.2px 61.3px 78.2px -1.5px hsl(${COLORS.shadow} / 0.15)`,
};

export const GRADIENTS = {
	grayBodyToGrayText: `linear-gradient(
        0deg,
        hsl(0deg 0% 44%) 0%,
        hsl(0deg 0% 50%) 0%,
        hsl(0deg 0% 55%) 0%,
        hsl(0deg 0% 61%) 0%,
        hsl(0deg 0% 67%) 0%,
        hsl(0deg 0% 72%) 42%,
        hsl(0deg 0% 78%) 61%,
        hsl(0deg 0% 84%) 76%,
        hsl(0deg 0% 89%) 88%,
        hsl(0deg 0% 95%) 100%
      );`,
};

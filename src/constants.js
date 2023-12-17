export const COLORS = {
	black: '#000000',
	white: '#FFFFFF',
	primaryBlue: '#17A2DF',
	red: '#FF0000',
	gray: {
		body: '#F2F2F2',
		card: '#F2F2F2',
		filter: '#E9E9E9',
		devider: '#DEDEDE',
		tag: '#DDDDDD',
		breadcrumb: '#A5A5A5',
	},
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

export const FONTS = {
	text: {
		normal: `${16 / 16}rem`,
		small: `${12 / 16}rem`,
	},
	heading: {
		large: `${40 / 16}rem`,
		normal: `${20 / 16}rem`,
		small: `${12 / 16}rem`,
	},
};


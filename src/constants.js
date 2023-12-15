export const COLORS = {
	white: '0deg 0% 100%',
	gray: {
		100: '185deg 5% 95%',
		300: '190deg 5% 80%',
		500: '196deg 4% 60%',
		700: '220deg 5% 40%',
		900: '220deg 3% 20%',
	},
	primary: '0deg 90% 90%',
	secondary: '359deg 90% 90%',
};

export const BREAKPOINTS = {
	phone: 600,
	tablet: 950,
	laptop: 1300,
};

export const QUERIES = {
	phoneAndDown: `(max-width: ${BREAKPOINTS.phone})`,
	tabletAndDown: `(max-width: ${BREAKPOINTS.tablet})`,
	laptopAndDown: `(max-width: ${BREAKPOINTS.laptop})`,
};

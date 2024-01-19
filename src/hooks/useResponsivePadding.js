import React from 'react';
import { BREAKPOINTS } from '/src/constants.js';

const useResponsivePadding = () => {
	const [padding, setPadding] = React.useState('80px');

	const updatePadding = () => {
		const viewportWidth = window.innerWidth;
		if (viewportWidth <= BREAKPOINTS.laptop) {
			// prettier-ignore
			const newPadding = Math.max(20,80 - (40 * (BREAKPOINTS.laptop - viewportWidth)) / (BREAKPOINTS.laptop - BREAKPOINTS.phone));
			setPadding(`${newPadding}px`);
		} else {
			setPadding('80px');
		}
	};

	React.useEffect(() => {
		window.addEventListener('resize', updatePadding);
		updatePadding();
		return () => window.removeEventListener('resize', updatePadding);
	}, []);

	return padding;
};

export default useResponsivePadding;

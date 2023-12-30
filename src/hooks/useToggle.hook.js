import React from 'react';

export default function useToggle(initialValue = false) {
	if (typeof initialValue !== 'boolean' && typeof initialValue !== 'function') {
		console.warn('Invalid type for useToggle hook');
	}

	const [value, setValue] = React.useState(initialValue);
	// memoizing the function
	const toggle = React.useCallback(() => {
		setValue((v) => !v);
	}, []);
	return [value, toggle];
}

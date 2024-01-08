import React from 'react';

export const visuallyHiddenStyles = {
	display: 'inline-block',
	// position: 'absolute',
	overflow: 'hidden',
	clip: 'rect(0 0 0 0)',
	height: 1,
	width: 1,
	margin: -1,
	padding: 0,
	border: 0,
};

const VisuallyHidden = ({ children, ...delegated }) => {
	return (
		<span style={visuallyHiddenStyles} {...delegated}>
			{children}
		</span>
	);
};

export default VisuallyHidden;

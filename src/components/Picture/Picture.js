import React from 'react';
import styled from 'styled-components';

// needs to be refactored - there are better ways to return this component

const Picture = ({
	source1x,
	source2x,
	source3x,
	alt = 'image',
	className,
}) => {
	const threeWays = typeof source3x !== 'undefined';
	const twoWays =
		typeof source1x !== 'undefined' &&
		typeof source2x !== 'undefined' &&
		typeof source3x === 'undefined';

	if (threeWays) {
		return (
			<img
				className={className}
				alt={alt}
				src={source1x}
				srcSet={`${source1x} 1x, ${source2x} 2x, ${source3x} 3x`}
			/>
		);
	} else if (twoWays) {
		return (
			<img
				className={className}
				alt={alt}
				src={source1x}
				srcSet={`${source1x} 1x, ${source2x} 2x, ${source2x} 3x`}
			/>
		);
	} else {
		return <img className={className} alt={alt} src={source1x} />;
	}
};

export default Picture;

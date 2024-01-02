const Picture = ({
	src,
	source1x,
	source2x,
	source3x,
	alt = 'Image',
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
		return <img className={className} alt={alt} src={source1x || src} />;
	}
};

export default Picture;

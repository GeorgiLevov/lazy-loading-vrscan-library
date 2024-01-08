import React from 'react';
import styled from 'styled-components';
import Picture from '../Picture/Picture';
import { COLORS, GRADIENTS, QUERIES, SPACING } from '../../constants';

const CardImage = ({ src, source2x, source3x, alt, variant }) => {
	let StyledImage;
	if (!variant) {
		StyledImage = StyledCardImage;
	} else if (variant === 'profile') {
		StyledImage = ProfileImage;
	} else if (variant === 'vrscan') {
		StyledImage = VRScanImage;
	} else {
		throw new Error(`Unrecognized Button variant: ${variant}`);
	}

	return (
		<StyledImage
			source1x={src}
			source2x={source2x}
			source3x={source3x}
			alt={alt}></StyledImage>
	);
};

const StyledCardImage = styled(Picture)`
	// expected to be flex child
	/* flex-grow: 1; */
	/* max-width: 320px; */
	width: 50%;
	max-height: 100%;
	padding: ${SPACING.medium};
`;

const ProfileImage = styled(Picture)`
	display: inline-block;
	width: 150px;
	height: 150px;
	border-radius: 50%;
	object-fit: cover;
`;

const VRScanImage = styled(Picture)`
	display: inline-block;
	width: 186px;
	height: 188px;
	object-fit: cover;
`;

export default CardImage;

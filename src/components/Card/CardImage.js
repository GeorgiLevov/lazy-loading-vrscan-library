import React from 'react';
import styled from 'styled-components';
import Picture from '../Picture/Picture';
import { GRADIENTS, QUERIES, SPACING } from '../../constants';

function CardImage({ src, source2x, source3x, alt, background }) {
	return (
		<StyledCardImage
			source1x={src}
			source2x={source2x}
			source3x={source3x}
			alt={alt}></StyledCardImage>
	);
}

export const CardImageContainer = styled.div`
	flex-grow: 1;

	background: #e9e9e9;
	@media ${QUERIES.tabletAndDown} {
		width: 100%;
	}
`;

const StyledCardImage = styled(Picture)`
	// expected to be flex child
	/* flex-grow: 1; */
	/* max-width: 320px; */
	width: 50%;
	max-height: 100%;
	padding: ${SPACING.medium};
`;

export default CardImage;


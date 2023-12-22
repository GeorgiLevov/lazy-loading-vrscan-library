import React from 'react';
import styled from 'styled-components';
import Picture from '../Picture/Picture';
import { GRADIENTS } from '../../constants';

function CardImage({ src, source2x, source3x, alt, background }) {
	return (
		<StyledCardImage
			source1x={src}
			source2x={source2x}
			source3x={source3x}
			alt={alt}></StyledCardImage>
	);
}
const StyledCardImage = styled(Picture)`
	// expected to be flex child
	flex-grow: 1;
	max-width: 320px;
`;

export default CardImage;

/**
 * @module CardImage
 * @description This React component renders an image for a card, supporting different styles based on the card's variant.
 * It uses the `Picture` component for rendering the image and applies specific styles for variants like 'profile', 'vrscan',
 * and 'inverted'. The component is designed to be flexible, allowing for various image sources and resolutions.
 * @prop {string} src - Default source for the image.
 * @prop {string} [source1x] - Fallback source for 1x resolution, defaults to src if not provided.
 * @prop {string} [source2x] - Source for 2x resolution.
 * @prop {string} [source3x] - Source for 3x resolution.
 * @prop {string} alt - Alt text for the image.
 * @prop {string} variant - Variant of the card to determine the image style.
 */

import styled from 'styled-components';
import Picture from '../Picture/Picture';
import { QUERIES, SPACING } from '../../constants';
import PropTypes from 'prop-types';

const CardImage = ({
	src,
	source1x = src,
	source2x,
	source3x,
	alt,
	variant,
}) => {
	let StyledImage;
	if (variant === 'profile') {
		StyledImage = ProfileImage;
	} else if (variant === 'vrscan') {
		StyledImage = VRScanImage;
	} else if (variant === 'inverted') {
		StyledImage = InvertedCardImage;
	} else {
		StyledImage = BaseCardImage;
	}

	return (
		<StyledImage
			source1x={src || source1x}
			source2x={source2x}
			source3x={source3x}
			alt={alt}></StyledImage>
	);
};

const BaseCardImage = styled(Picture)`
	max-height: 100%;
	padding: ${SPACING.medium};
`;
const InvertedCardImage = styled(Picture)`
	width: 279.6px;
	height: 282px;
	padding: 0;

	@media ${QUERIES.phoneAndDown} {
		width: revert;
		height: revert;
	}
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
	width: 188px;
	height: 190px;
	object-fit: cover;
`;

export default CardImage;

CardImage.propTypes = {
	variant: PropTypes.string.isRequired,
	src: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	alt: PropTypes.string,
	source1x: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	source2x: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	source3x: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

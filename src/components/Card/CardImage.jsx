import styled from 'styled-components';
import Picture from '../Picture/Picture';
import { SPACING } from '../../constants';
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

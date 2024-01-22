/**
 * @module Card
 * @description This React component renders a card that can display various types of content based on the provided variant.
 * It supports multiple styles like base, inverted, profile, and vrscan. The component is highly customizable, allowing
 * for different layouts and content such as images, summaries, and additional children elements.
 * @prop {number} [scanId] - Optional ID for the card, used in VRScan cards.
 * @prop {array} [summary] - Array containing summary details for the card.
 * @prop {string} [name] - Name to be displayed on the card.
 * @prop {string} variant - Variant of the card to determine its style.
 * @prop {string} [imageAlt] - Alt text for the image.
 * @prop {string|array} [imageSrc] - Source for the image or array of images.
 * @prop {bool} [favorited] - Indicates if the item is favorited (for vrscan cards).
 * @prop {func} [toggleFavorite] - Function to toggle the favorite status (for vrscan cards).
 * @prop {ReactNode} [children] - Additional children elements to be rendered inside the card.
 */
import styled from 'styled-components';
import { SPACING, COLORS, FONTS, WEIGHTS, GRADIENTS } from '../../constants';
import CardImage from './CardImage';
import { Heart } from 'react-feather';
import Slider from '../Slider';
import CardSummary from './CardSummary';
import { BaseCard, InvertedCard, ProfileCard, VRScanCard } from './CardStyles';
import PropTypes from 'prop-types';

const CARDVARIANTS = {
	base: BaseCard,
	inverted: InvertedCard,
	profile: ProfileCard,
	vrscan: VRScanCard,
};

const CARDSTYLES = {
	base: {
		'--backgroundColor': COLORS.white,
	},
	inverted: {
		'--backgroundColor': COLORS.gray.dark,
	},
	profile: {
		'--backgroundColor': COLORS.white,
	},
	vrscan: {
		'--backgroundColor': COLORS.white,
	},
};

const IMAGESTYLES = {
	base: {
		'--backgroundColor': COLORS.white,
		'--marginBottom': `0px`,
	},
	inverted: {
		'--backgroundColor': COLORS.white,
		'--marginBottom': `0px`,
		'--display': `flex`,
		'--alignItems': `center`,
		'--justifyContent': `center`,
	},
	profile: {
		'--backgroundColor': COLORS.white,
		'--marginBottom': SPACING.micro,
	},
	vrscan: {
		'--backgroundColor': COLORS.white,
		'--marginBottom': `0px`,
	},
};

const DETAILSTYLES = {
	base: {
		'--alignItems': `center`,
		'--backgroundColor': COLORS.white,
		'--backgroundImage': GRADIENTS.white,
	},
	inverted: {
		'--alignItems': `flex-start`,
		'--backgroundColor': COLORS.gray.vrscan,
		'--backgroundImage': GRADIENTS.whiteToVRScan,
	},
	profile: {
		'--alignItems': `center`,
		'--backgroundColor': COLORS.white,
		'--backgroundImage': GRADIENTS.white,
	},
	vrscan: {
		'--alignItems': `flex-start`,
		'--backgroundColor': COLORS.gray.vrscan,
		'--backgroundImage': GRADIENTS.whiteToVRScan,
	},
};

function Card({
	scanId,
	summary,
	name,
	variant,
	imageAlt,
	imageSrc,
	favorited,
	toggleFavorite,
	children,
}) {
	const cardStyles = CARDSTYLES[variant];
	const imageStyles = IMAGESTYLES[variant];
	const detailStyles = DETAILSTYLES[variant];
	const StyledComponent = CARDVARIANTS[variant];

	if (!StyledComponent) {
		throw new Error(`Unrecognized Card variant: ${variant}`);
	}

	const handleSummary = (summaryArray) => {
		return {
			material: summaryArray[0],
			colors: summaryArray[1],
			tags: summaryArray[2],
		};
	};

	return (
		<StyledComponent style={cardStyles} data-testid="card">
			{summary?.length > 0 && variant === 'vrscan' && (
				<CardSummary {...handleSummary(summary)} style={imageStyles} />
			)}
			<ImageWrapper style={imageStyles} data-testid="card-image">
				{Array.isArray(imageSrc) ? (
					<Slider contents={imageSrc} />
				) : (
					<CardImage
						variant={variant}
						alt={imageAlt || 'Image'}
						src={imageSrc}
					/>
				)}

				{variant === 'vrscan' && (
					<Label onClick={() => toggleFavorite(scanId)}>
						<HeartIcon
							$favorited={favorited}
							strokeWidth={1.1}
							stroke="#FF0000"
						/>
					</Label>
				)}
			</ImageWrapper>
			<CardDetails data-testid="card-details" style={detailStyles}>
				{variant === 'inverted'
					? name && <CardTitle>{name}</CardTitle>
					: name && <CardName>{name}</CardName>}
				{children}
			</CardDetails>
		</StyledComponent>
	);
}

const HeartIcon = styled(Heart)`
	fill: ${(props) => (props.$favorited ? '#FF0000' : 'none')};
	cursor: pointer;
	transition: fill 0.3s ease;

	&:hover {
		stroke: #ff6666;
	}
`;

const CardDetails = styled.section`
	/* assuming the details are a flex-child */
	width: 100%;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	align-items: var(--alignItems);
	min-height: 92px;
	padding: ${SPACING.micro} ${SPACING.medium};
	background-color: var(--backgroundColor);
	background-image: linear-gradient(var(--backgroundImage));
`;

const Label = styled.button`
	background-color: ${COLORS.transparent};
	cursor: pointer;
	border: none;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 10px;
`;

const CardTitle = styled.h2`
	font-weight: ${WEIGHTS.bold};
	text-align: left;
	margin-right: auto;
	margin: ${SPACING.small} 0;
`;
const CardName = styled.p`
	font-size: ${FONTS.text.normal};
	font-weight: ${WEIGHTS.bold};
	margin-bottom: ${SPACING.micro};
`;

const ImageWrapper = styled.div`
	margin-bottom: var(--marginBottom);
	position: relative;
	flex-grow: 1;
	width: 100%;
	max-height: 50%;
	text-align: center;
	background-color: var(--backgroundColor);
	display: var(--display);
	align-items: var(--alignItems);
	justify-content: var(--justifyContent);
`;

export default Card;

Card.propTypes = {
	scanId: PropTypes.number,
	summary: PropTypes.array,
	name: PropTypes.string,
	variant: PropTypes.string.isRequired,
	imageAlt: PropTypes.string,
	imageSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	favorited: PropTypes.bool,
	toggleFavorite: PropTypes.func,
	children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};


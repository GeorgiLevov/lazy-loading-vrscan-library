import React from 'react';
import styled from 'styled-components';
import {
	SPACING,
	SHADOWS,
	COLORS,
	QUERIES,
	FONTS,
	WEIGHTS,
} from '../../constants';
import CardImage from './CardImage';
import { Heart } from 'react-feather';
import Slider from '../Slider';
import CardSummary from './CardSummary';

const CARDSTYLES = {
	base: {
		'--backgroundColor': `${COLORS.white}`,
	},
	inverted: {
		'--backgroundColor': `${COLORS.gray.dark}`,
	},
	profile: {
		'--backgroundColor': `${COLORS.white}`,
	},
	vrscan: {
		'--backgroundColor': `${COLORS.white}`,
	},
};

const IAMGESTYLES = {
	base: {
		'--backgroundColor': `${COLORS.white}`,
		'--marginBottom': `0px`,
	},
	inverted: {
		'--backgroundColor': `${COLORS.gray.dark}`,
		'--marginBottom': `0px`,
	},
	profile: {
		'--backgroundColor': `${COLORS.white}`,
		'--marginBottom': `${SPACING.micro}`,
	},
	vrscan: {
		'--backgroundColor': `${COLORS.white}`,
		'--marginBottom': `${SPACING.mega}`,
	},
};

const DETAILSTYLES = {
	base: {
		'--alignItems': `center`,
	},
	inverted: {
		'--alignItems': `flex-start`,
	},
	profile: {
		'--alignItems': `center`,
	},
	vrscan: {
		'--alignItems': `flex-start`,
	},
};

function Card({
	summary,
	name,
	variant,
	imageAlt,
	imageSrc,
	favorited,
	children,
}) {
	let styles = CARDSTYLES[variant];
	let iamgeStyles = IAMGESTYLES[variant];
	let detailStyles = DETAILSTYLES[variant];

	let StyledComponent;
	if (variant === 'base') {
		StyledComponent = BaseCard;
	} else if (variant === 'inverted') {
		StyledComponent = InvertedCard;
	} else if (variant === 'profile') {
		StyledComponent = ProfileCard;
	} else if (variant === 'vrscan') {
		StyledComponent = VRScanCard;
	} else {
		throw new Error(`Unrecognized Button variant: ${variant}`);
	}

	const handleSummary = (summaryArray) => {
		return {
			material: summaryArray[0],
			colors: summaryArray[1],
			tags: summaryArray[2],
		};
	};

	return (
		<StyledComponent style={styles}>
			{summary?.length && <CardSummary {...handleSummary(summary)} />}
			<ImageWrapper style={iamgeStyles}>
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
					<Label>
						{favorited ? (
							<Heart strokeWidth={1.1} stroke={COLORS.red} fill={COLORS.red} />
						) : (
							<Heart strokeWidth={1.1} stroke={COLORS.red} />
						)}
					</Label>
				)}
			</ImageWrapper>
			<CardDetails style={detailStyles}>
				{variant === 'inverted'
					? name && <CardTitle>{name}</CardTitle>
					: name && <CardName>{name}</CardName>}
				{children}
			</CardDetails>
		</StyledComponent>
	);
}

// expects parent to be display:flex
const BaseCard = styled.article`
	width: 100%;
	max-width: 1200px;
	/* needs these styles when more than 1 of this component exists on page */
	/* flex: 1; */
	/* min-width: 0px; */
	background-color: ${COLORS.white};
	margin: ${SPACING.micro};
	border-radius: 20px;
	overflow: hidden;
	display: flex;
	flex-direction: column;
`;

const InvertedCard = styled(BaseCard)`
	flex-direction: row;
	align-items: stretch;
	justify-content: center;
	min-height: 50vh;

	// expecting only 2 children in inverted card format
	& > * {
		flex-basis: 50%;
		min-width: 0px;
	}

	@media ${QUERIES.tabletAndDown} {
		flex-direction: column;
	}
`;

const ProfileCard = styled(BaseCard)`
	margin: 0;
	padding: ${SPACING.large} ${SPACING.small};
	max-width: 280px;
	align-items: center;

	& > * {
		margin-bottom: ${SPACING.micro};

		&:last-child {
			margin-bottom: 0px;
		}
	}

	@media ${QUERIES.tabletAndDown} {
		width: 100%;
		text-align: center;
		margin: 0 auto;
	}
`;

const VRScanCard = styled(ProfileCard)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: ${COLORS.white};
	border-radius: 10px;
	padding: ${SPACING.small};

	overflow: hidden;
	position: relative;

	@media ${QUERIES.phoneAndDown} {
		margin: 0 auto;
	}
`;

const CardDetails = styled.section`
	/* assuming the details are a flex-child */
	width: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	align-items: var(--alignItems);
	min-height: 92px;
`;

const Label = styled.div`
	position: absolute;
	bottom: ${`-${SPACING.large}`};
	right: ${`-${SPACING.giga}`};
	background: transparent;
	padding: 0 ${SPACING.small};
`;

const CardTitle = styled.h2`
	font-weight: ${WEIGHTS.bold};
	text-align: left;
	margin-right: auto;
`;
const CardName = styled.p`
	font-size: ${FONTS.text.normal};
	font-weight: ${WEIGHTS.bold};
	margin-bottom: ${SPACING.micro};
`;

const ImageWrapper = styled.div`
	background-color: var(--backgroundColor);
	margin-bottom: var(--marginBottom);
	position: relative;
	flex-grow: 1;
`;

export default Card;

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

	return (
		<StyledComponent style={styles}>
			{variant === 'vrscan' && (
				<CardSummary>
					{summary &&
						summary.map((item) => {
							return (
								<CardSummaryItem key={item.$id}>{item.name}</CardSummaryItem>
							);
						})}
				</CardSummary>
			)}
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

const CardSummary = styled.ol`
	list-style-type: none;
	width: 100%;
	font-family: 'Helvetica', sans-serif;
	font-weight: 300;
	display: flex;
	min-height: ${FONTS.heading.normal};
	margin: 0;
	margin-bottom: ${SPACING.small};

	& > * {
		margin-right: ${SPACING.micro};
		margin-right: ${SPACING.micro};
	}
	/* hide any additional that don't fit on screen   */
`;

const CardSummaryItem = styled.li`
	display: inline;
	font-size: ${FONTS.text.label};
	border: 1px solid ${COLORS.transparent};
	border-radius: 16px;
	padding: 0 ${SPACING.micro};

	color: ${COLORS.black};
	background: ${COLORS.gray.tag};
`;

const CardDetails = styled.section`
	/* assuming the details are a flex-child */
	width: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	align-items: var(--alignItems);
	align-items: var(--alignItems);
`;

const Label = styled.div`
	position: absolute;
	bottom: ${`-${SPACING.mega}`};
	right: ${`-${SPACING.mega}`};
	background: transparent;
	height: ${SPACING.large};
	line-height: ${SPACING.large};
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

// expects parent to be display:flex
const BaseCard = styled.article`
	width: 100%;
	max-width: 1200px;
	/* needs these styles when more than 1 of this component exists on page */
	/* flex: 1; */
	/* min-width: 0px; */
	background-color: var(--backgroundColor);
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
		margin-bottom: ${SPACING.micro};
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

	overflow: hidden;
	position: relative;

	.card-image {
		width: 100%;
		height: auto;
		object-fit: cover;
	}

	.card-details {
		padding: ${SPACING.small};
	}

	.heart-icon {
		position: absolute;
		top: 10px;
		right: 10px;
		z-index: 10;
	}

	@media ${QUERIES.phoneAndDown} {
		margin: 0 auto;
	}
`;

// background color logic not working
// margin-bottom doesn't need to apply to inverted card
const ImageWrapper = styled.div`
	background-color: var(--backgroundColor);
	background-color: var(--backgroundColor);
	position: relative;
	flex-grow: 1;
`;

export default Card;

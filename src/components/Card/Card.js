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

function Card({
	summary,
	name,
	variant,
	imageAlt,
	imageSrc,
	favorited,
	children,
}) {
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
		<StyledComponent>
			{variant === 'vrscan' && (
				<CardSummary>
					{/* <Materials/><Colors/><Tags/> */}
					{summary}
				</CardSummary>
			)}
			<ImageWrapper>
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
			<CardDetails>
				{variant === 'inverted'
					? name && <CardTitle>{name}</CardTitle>
					: name && <CardName>{name}</CardName>}
				{children}
			</CardDetails>
		</StyledComponent>
	);
}

const CardSummary = styled.div`
	display: flex;
	& > * {
		margin-right: ${SPACING.small};
	}
	/* hide any additional that don't fit on screen   */
`;

const CardDetails = styled.section`
	/* assuming the details are a flex-child */
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	align-items: center;
`;

const Label = styled.div`
	position: absolute;
	bottom: ${`-${SPACING.mega}`};
	right: ${`-${SPACING.mega}`};
	background: transparent;
	height: ${SPACING.large};
	line-height: ${SPACING.large};
	padding: 0 ${SPACING.small};
	color: var(--color-white);
`;

const CardTitle = styled.h2`
	font-weight: ${WEIGHTS.bold};
	text-align: left;
	margin-right: auto;
`;
const CardName = styled.p`
	font-size: ${FONTS.text.normal};
	font-weight: ${WEIGHTS.bold};
`;

// expects parent to be display:flex
const BaseCard = styled.article`
	width: 100%;
	max-width: 1200px;
	/* needs these styles when more than 1 of this component exists on page */
	/* flex: 1; */
	/* min-width: 0px; */
	background: ${COLORS.white};
	margin: ${SPACING.xs};
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
	display: flex;
	flex-direction: column;
	align-items: center;

	& > * {
		margin-bottom: ${SPACING.xs};
	}

	@media ${QUERIES.tabletAndDown} {
		width: 100%;
		text-align: center;
		margin: 0 auto;
	}
`;

const VRScanCard = styled(ProfileCard)`
	width: auto;
	height: auto;
	min-width: 275px;
	flex: 1;

	& > * {
		margin-bottom: ${SPACING.small};
	}
`;

// background color logic not working
// margin-bottom doesn't need to apply to inverted card
const ImageWrapper = styled.div`
	background-color: ${(p) =>
		p.variant === 'inverted' ? COLORS.gray.dark : COLORS.transparent};
	position: relative;
	flex-grow: 1;
	margin-bottom: ${SPACING.mega};
`;

export default Card;

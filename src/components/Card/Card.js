import React from 'react';
import styled from 'styled-components';
import { SPACING, SHADOWS, COLORS, QUERIES } from '../../constants';

function Card({ variant, children }) {
	let StyledComponent;
	if (variant === 'base') {
		StyledComponent = CardBase;
	} else if (variant === 'inverted') {
		StyledComponent = CardInverted;
	} else {
		throw new Error(`Unrecognized Button variant: ${variant}`);
	}

	return <StyledComponent>{children}</StyledComponent>;
}

// expects parent to be display:flex
const CardBase = styled.article`
	width: 100%;
	max-width: 1200px;
	/* needs these styles when more than 1 of this component exists on page */
	/* flex: 1; */
	/* min-width: 0px; */
	background: ${COLORS.white};
	margin: ${SPACING.small};

	border-radius: 20px;
	box-shadow: ${SHADOWS.low};
	overflow: hidden;

	display: flex;
	flex-direction: column;
`;

const CardInverted = styled(CardBase)`
	flex-direction: row;
	align-items: stretch;
	justify-content: center;
	min-height: 50vh;

	// expecting only 2 children in inverted card format
	& > * {
		// preventing card break
		flex-basis: 50%;
		min-width: 0px;
	}

	@media ${QUERIES.tabletAndDown} {
		flex-direction: column;
	}
`;

export default Card;


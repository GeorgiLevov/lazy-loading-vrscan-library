import React from 'react';
import styled from 'styled-components';
import { SPACING, SHADOWS, COLORS } from '../../constants';

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
	padding: ${SPACING.medium};
	border-radius: 20px;
	box-shadow: ${SHADOWS.low};

	display: flex;
	flex-direction: column;
`;

const CardInverted = styled(CardBase)`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;

	// expecting only 2 children in inverted card format
	& > * {
		// preventing card break
		min-width: 0px;
		margin: ${SPACING.large};
	}
`;

export default Card;

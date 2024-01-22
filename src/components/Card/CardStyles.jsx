import styled from 'styled-components';
import { SPACING, COLORS, QUERIES, SHADOWS } from '../../constants';

// expects parent to be display:flex
export const BaseCard = styled.article`
	width: 100%;
	max-width: 1200px;
	/* needs these styles when more than 1 of this component exists on page */
	/* flex: 1; */
	/* min-width: 0px; */
	background-color: ${COLORS.white};
	border-radius: 20px;
	overflow: hidden;
	display: flex;
	flex-direction: column;
`;

export const InvertedCard = styled(BaseCard)`
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

export const ProfileCard = styled(BaseCard)`
	margin: 0;
	padding: ${SPACING.large} ${SPACING.medium};
	max-width: 280px;
	align-items: center;
	transition: box-shadow 0.15s ease-in-out;
	box-shadow: ${SHADOWS.low};

	&:hover {
		box-shadow: ${SHADOWS.medium};
	}

	& > * {
		&:last-child {
			margin-bottom: 0px;
		}
	}

	@media ${QUERIES.tabletAndDown} {
		width: 100%;

		margin: 0 auto;
	}
`;

export const VRScanCard = styled(ProfileCard)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-radius: 20px;
	padding: 0;
	border: 1px solid ${COLORS.gray.light};
	overflow: hidden;
	position: relative;
	height: 520px;

	& > * {
		padding: ${SPACING.small};
	}

	@media ${QUERIES.phoneAndDown} {
		margin: 0 auto;
	}
`;

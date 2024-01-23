import styled, { keyframes } from 'styled-components';
import { FONTS, QUERIES, SPACING } from '../../constants';

function NoResultsHeader({ children }) {
	return <StyledNoResultsHeader>{children}</StyledNoResultsHeader>;
}

const fadeInAnimation = keyframes`
 0% { transform: translateZ(-80px); opacity: 0; }
    100% { transform: translateZ(0); opacity: 1; }
`;

const StyledNoResultsHeader = styled.div`
	font-family: 'Helvetica', sans-serif;
	font-weight: 300;
	font-size: ${FONTS.heading.large};
	width: max-content;
	text-align: center;
	margin: 0 auto;
	margin-bottom: ${SPACING.mega};
	grid-column-start: 1;
	grid-column-end: 5;

	animation-name: ${fadeInAnimation};
	animation-duration: 1s;
	animation-timing-function: cubic-bezier(0.39, 0.575, 0.565, 1);
	animation-delay: 1s;
	animation-fill-mode: both;
	animation-iteration-count: 1;

	@media ${QUERIES.phoneAndDown} {
		width: inherit;
	}
`;

export default NoResultsHeader;

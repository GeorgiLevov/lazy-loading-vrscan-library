import React from 'react';
import styled from 'styled-components';
import { QUERIES } from '../../constants';

const CardDetails = ({ children }) => {
	return <StyledCardDetails>{children}</StyledCardDetails>;
};

const StyledCardDetails = styled.section`
	/* assuming the details are a flex-child */
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	align-items: center;
	width: 50%;

	@media ${QUERIES.tabletAndDown} {
		width: 100%;
	}
`;

export default CardDetails;

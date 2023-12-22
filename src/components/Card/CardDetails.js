import React from 'react';
import styled from 'styled-components';

const CardDetails = ({ children }) => {
	return <StyledCardDetails>{children}</StyledCardDetails>;
};

const StyledCardDetails = styled.section`
	/* assuming the details are a flex-child */
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	align-items: center;
`;

export default CardDetails;

import React from 'react';
import styled from 'styled-components';
import { QUERIES } from '../../constants';
import useResponsivePadding from '../../hooks/ResponsvieContainer';

function Container({ children }) {
	const responsivePadding = useResponsivePadding();

	return (
		<StyledContainer style={{ padding: `0 ${responsivePadding}` }}>
			{children}
		</StyledContainer>
	);
}

export const StyledContainer = styled.div`
	max-width: 1360px;
	width: 100%;
	margin: 0 auto;

	@media ${QUERIES.laptopAndDown} {
		padding: 0 80px;
	}
`;

export default Container;

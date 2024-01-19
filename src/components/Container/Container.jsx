import React from 'react';
import styled from 'styled-components';
import useResponsivePadding from '../../hooks/useResponsivePadding';

function Container({ children, style }) {
	const responsivePadding = useResponsivePadding();

	return (
		<StyledContainer style={{ '--padding': responsivePadding, ...style }}>
			{children}
		</StyledContainer>
	);
}

export const StyledContainer = styled.div`
	max-width: 1360px;
	width: 100%;
	margin: 0 auto;
	padding: 0 80px;
	padding: 0 var(--padding);
`;

export default Container;

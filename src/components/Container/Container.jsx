import React from 'react';
import styled from 'styled-components';
import useResponsivePadding from '../../hooks/ResponsvieContainer';

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

/* padding: ${(p) => p.$padding !== undefined ? `0 ${p.$padding}` : '0 80px'}; */

// export const StyledContainer = styled.div.attrs((props) => ({
// 	style: {
// 		padding: `${
// 			props.$padding !== undefined ? `0 ${props.$padding}` : '0 80px'
// 		}`,
// 		maxWidth: '1360px',
// 		width: '100%',
// 		margin: '0 auto',
// 	},
// }))``;

export default Container;

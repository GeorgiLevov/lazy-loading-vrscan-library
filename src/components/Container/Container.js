import React from 'react';
import styled from 'styled-components';
import useResponsivePadding from '../../hooks/ResponsvieContainer';

function Container({ children }) {
	const responsivePadding = useResponsivePadding();

	return (
		<StyledContainer $padding={responsivePadding}>{children}</StyledContainer>
	);
}

// export const StyledContainer = styled.div`
// 	padding: ${(p) => (p.$padding !== undefined ? `0 ${p.$padding}` : '0 80px')};
// `;

export const StyledContainer = styled.div.attrs((props) => ({
	style: {
		padding: `${
			props.$padding !== undefined ? `0 ${props.$padding}` : '0 80px'
		}`,
		maxWidth: '1360px',
		width: '100%',
		margin: '0 auto',
	},
}))``;

export default Container;

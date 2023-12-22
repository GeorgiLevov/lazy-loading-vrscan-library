import React from 'react';
import styled from 'styled-components';

function FormTitle({ children }) {
	return <StyledTitle>{children}</StyledTitle>;
}

const StyledTitle = styled.h1`
	display: block;
	font-size: 1.75rem;
`;

export default FormTitle;

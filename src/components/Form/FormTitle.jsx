import React from 'react';
import styled from 'styled-components';
import { FONTS } from '../../constants';

function FormTitle({ children }) {
	return <StyledTitle>{children}</StyledTitle>;
}

const StyledTitle = styled.h1`
	display: block;
	font-size: ${FONTS.heading.xl};
`;

export default FormTitle;

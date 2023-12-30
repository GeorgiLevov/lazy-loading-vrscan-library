import React from 'react';
import styled from 'styled-components';
import { FONTS } from '../../constants';

function PageTitle({ children }) {
	return <StyledPageTitle>{children}</StyledPageTitle>;
}

const StyledPageTitle = styled.h1`
	display: block;
	font-size: ${FONTS.heading.xl};
`;

export default PageTitle;

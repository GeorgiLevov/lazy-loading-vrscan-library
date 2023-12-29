import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants';

function Divider() {
	return <StyledDivider />;
}

const StyledDivider = styled.hr`
	border: 1px solid transparent;
	border-bottom: 1px solid ${COLORS.gray.divider};
	padding-bottom: 20px;
	margin-bottom: 30px;
`;

export default Divider;

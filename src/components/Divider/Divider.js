import React from 'react';
import styled from 'styled-components';
import { COLORS, SPACING } from '../../constants';

function Divider() {
	return <StyledDivider />;
}

const StyledDivider = styled.hr`
	border: 1px solid transparent;
	border-bottom: 1px solid ${COLORS.gray.divider};
	margin-bottom: ${SPACING.medium};
	margin-top: ${SPACING.small};
`;

export default Divider;

import React from 'react';
import styled from 'styled-components';
import { SPACING, COLORS } from '../../constants';

const StyledInput = ({ children }) => {
	return <StyledWrapper>{children}</StyledWrapper>;
};

const StyledWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: baseline;
	gap: 16px;
	margin-bottom: ${SPACING.medium};

	& > label {
		width: 6rem;
		text-align: right;
	}

	& > input {
		width: inherit;
		background-color: ${COLORS.offwhite};
		color: ${COLORS.black};
		padding: ${SPACING.small} ${SPACING.medium};
		border-radius: 30px;
		line-height: 2;
		font-weight: 300;

		&::placeholder {
			color: ${COLORS.gray.text};
			opacity: 0.8;
			font-weight: 300;
			padding-left: ${SPACING.large};
		}
		&::-webkit-input-placeholder {
			color: ${COLORS.gray.text};
			opacity: 0.8;
			font-weight: 300;
			padding-left: ${SPACING.medium};
		}
		&::-moz-placeholder {
			color: ${COLORS.gray.text};
			opacity: 0.8;
			font-weight: 300;
			padding-left: ${SPACING.medium};
		}
		&:-ms-input-placeholder {
			color: ${COLORS.gray.text};
			opacity: 0.8;
			font-weight: 300;
			padding-left: ${SPACING.medium};
		}
	}
`;

export default StyledInput;

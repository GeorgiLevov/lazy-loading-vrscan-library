import styled from 'styled-components';
import { SPACING, COLORS } from '../../constants';

const StyledInput = ({ children }) => {
	return <StyledInputWrapper>{children}</StyledInputWrapper>;
};

const StyledInputWrapper = styled.div`
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
		background-color: ${COLORS.white};
		color: ${COLORS.black};
		padding: ${SPACING.micro} ${SPACING.small};
		border-radius: 30px;
		line-height: 2;
		font-weight: 300;
		/* placeholder padding style doesn't work for Fireforx */
		&::placeholder {
			color: ${COLORS.gray.text};
			opacity: 0.8;
			font-weight: 300;
		}
	}
`;

export default StyledInput;

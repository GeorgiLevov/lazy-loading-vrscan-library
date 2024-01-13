import styled from 'styled-components';
import { COLORS, FONTS, QUERIES, SPACING } from '../../constants';

export const ProfileContainer = styled.div`
	padding-top: ${SPACING.mega};
	padding-bottom: ${SPACING.mega};
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: stretch;

	@media (${QUERIES.tabletAndDown}) {
		flex-direction: column;
	}

	& > section {
		margin-right: ${SPACING.mega};

		@media (${QUERIES.tabletAndDown}) {
			margin: 0;
			margin-bottom: ${SPACING.mega};
		}
	}
`;

export const ProfileSection = styled.section`
	flex: 1 0;
	display: flex;
`;

export const ProfileDetails = styled.div`
	margin-top: 10px;
	font-family: 'Helvetica', sans-serif;

	& > * {
		font-weight: 500;
		font-size: ${FONTS.text};

		&:last-child {
			font-weight: 300;
		}
	}
`;

export const TextInputWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	margin-bottom: 20px;

	& > label {
		display: block;
		flex-basis: 100%;
		font-size: ${FONTS.text.label};
		padding-bottom: ${SPACING.micro};
		color: ${COLORS.gray.text};
	}

	& > input {
		background: #fff;
		flex-grow: 1;
		max-width: 60%;
		background: #fff;
		padding: ${SPACING.micro} ${SPACING.small};
		border-radius: 30px;
		line-height: 2;
		font-weight: 300;

		@media (${QUERIES.tabletAndDown}) {
			max-width: revert;
		}
	}
`;

export const ProfileSettings = styled.section`
	flex: 3 0;
`;

export const EmailEditContainer = styled.div`
	& > * {
		margin-bottom: ${SPACING.micro};
	}
`;

export const EmailEditMessage = styled.label`
	display: block;
	color: red;

	& > p {
		color: ${COLORS.black};
	}
	& > span {
		color: ${COLORS.black};
		font-weight: 500;
	}
`;

export const EmailEditInputContainer = styled.div`
	width: 100%;
	display: inline-flex;
`;

export const InputField = styled.input`
	color: ${({ $isEditing }) => ($isEditing ? 'black' : `${COLORS.gray.dark}`)};
	border: 1px solid transparent;
	outline: none;
	padding: ${SPACING.micro} ${SPACING.small};
	flex-grow: 1;
	background-color: ${COLORS.white};
	font-weight: 300;
	&:focus {
		outline: none;
		border: 1px solid
			${({ $isEditing }) =>
				$isEditing ? `${COLORS.primaryBlue}` : 'transparent'};
	}
`;

export const EditButton = styled.button`
	background-color: ${COLORS.black};
	color: ${COLORS.white};
	cursor: pointer;
`;

export const SaveButton = styled.button`
	display: inline-block;
	margin: 0;
	border: 0;
	background: transparent;
	font-family: 'Helvetica', sans-serif;
	font-weight: 300;
	overflow: hidden;
	cursor: pointer;
	text-decoration: none;
	color: #17a2df;
	display: flex;
	align-items: center;
	align-content: center;
	transition: color 0.2s ease-in-out;
	border-radius: 30px;
	font-size: 1rem;
	padding: 12px 20px;
`;

export const CancelButton = styled(SaveButton)`
	color: #8e8e8e;
	padding: 12px 5px;
`;

export const ErrorMessage = styled.div`
	color: red;
	margin-top: 10px;
	font-family: 'Helvetica', sans-serif;
	font-weight: 300;
	font-size: 14px;
`;


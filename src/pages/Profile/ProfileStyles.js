import styled from 'styled-components';
import { COLORS, FONTS, QUERIES, SPACING } from '../../constants';

import Picture from '../../components/Picture/Picture';
import { space } from 'postcss/lib/list';

export const ProfileContainer = styled.div`
	padding-top: ${SPACING.xl};
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: flex-start;

	@media (${QUERIES.tabletAndDown}) {
		flex-direction: column;
	}
`;

export const ProfileSection = styled.section`
	flex: 1 0;
	display: flex;
	margin-right: ${SPACING.xl};
`;

export const ProfileImage = styled(Picture)`
	display: inline-block;
	width: 150px;
	height: 150px;
	border-radius: 50%;
	object-fit: cover;
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
		padding-bottom: ${SPACING.xs};
		color: ${COLORS.gray.text};
	}

	& > input {
		flex-grow: 1;
		max-width: 60%;
		background-color: ${COLORS.white};
		color: ${COLORS.black};
		padding: ${SPACING.xs} ${SPACING.small};
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
		margin-bottom: ${SPACING.xs};
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
	background-color: ${({ $isEditing }) =>
		$isEditing ? `${COLORS.white}` : `${COLORS.white}`};
	color: ${({ $isEditing }) => ($isEditing ? 'black' : '#808080')};
	border: 1px solid transparent;
	outline: none;
	padding: ${SPACING.xs} ${SPACING.small};
	flex-grow: 1;

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

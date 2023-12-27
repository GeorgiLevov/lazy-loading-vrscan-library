import styled from 'styled-components';
import { COLORS, FONTS } from '../../constants';
import Button from '../../components/Button';

export const ProfileContainer = styled.div`
	margin-top: 40px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: flex-start;

	@media (max-width: 768px) {
		flex-direction: column;
	}

	.section-profile-info {
		max-width: 300px;
		margin-right: 50px;
		background: ${COLORS.white};
		padding: 25px;
		border-radius: 20px;
		text-align: center;
		margin-bottom: 40px;

		@media (max-width: 768px) {
			width: 100%;
			text-align: center;
			max-width: 100%;

			button {
				margin: 0 auto;
			}
		}

		.profile-image-container {
			display: flex;
			justify-content: center;
			width: 100%;
			max-width: 150px;
			margin: 0 auto;
			margin-bottom: 10px;

			img {
				display: inline-block;
				width: 150px;
				height: 150px;
				border-radius: 50%;
				object-fit: cover;
			}
		}

		.user-details {
			margin-top: 10px;
			font-family: 'Helvetica', sans-serif;

			.fullname {
				font-weight: 500;
				font-size: ${FONTS.text};
			}
			.email {
				font-weight: 300;
				font-size: ${FONTS.text};
			}
		}
	}
	.additional-links-wrap {
		a {
			padding: 0px !important;
			margin-bottom: 15px;
		}
	}

	.section-profile-settings {
		flex: 1;
		margin-bottom: 50px;
		.profile-settings-wrap {
			padding-bottom: 20px;
			margin-bottom: 30px;
			border-bottom: 1px solid #ddd;
		}

		h2 {
			padding-bottom: 20px;
		}
		label {
			padding-bottom: 8px;
			display: block;
			font-size: 15px;
			color: #6c6c6c;
		}

		.edit-row {
			margin-bottom: 20px;

			.input {
				display: flex;
				justify-content: flex-start;
				align-items: center;
			}

			.email-wrap {
				padding-bottom: 10px;
			}

			.popup {
				padding: 20px;
				background: #eaeaea;
				border-radius: 20px;
			}
			.popup-warning {
				margin-bottom: 10px;
				label {
					color: red;
					margin-bottom: 0;
					padding-bottom: 0;
				}
				label > span {
					color: #000;
					font-weight: 500;
				}
				p {
					font-size: 13px;
				}
			}
		}
	}
`;

export const InputField = styled.input`
	background-color: ${({ $isEditing }) =>
		$isEditing ? `${COLORS.white}` : `${COLORS.white}`};
	color: ${({ $isEditing }) => ($isEditing ? 'black' : '#808080')};
	border: 1px solid transparent;
	outline: none;
	padding: 10px 15px;

	&:focus {
		outline: none;
		border: 1px solid
			${({ $isEditing }) =>
				$isEditing ? `${COLORS.primaryBlue}` : 'transparent'};
	}
`;

export const EditButton = styled.button`
	background-color: #000;
	color: #fff;
	cursor: pointer;
`;

export const SaveButton = styled.button`
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


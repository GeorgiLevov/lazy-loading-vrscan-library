import styled from 'styled-components';
import { COLORS, FONTS, QUERIES } from '../../constants';

export const ContainerHeader = styled.div`
	position: sticky;
	top: 0;
	transition: all 0.6ms ease-in;
	margin: 0 auto;
	width: 100%;

	background-color: ${({ $isScrolled }) =>
		$isScrolled ? 'rgba(255, 255, 255, 0.4)' : 'transparent'};
	backdrop-filter: ${({ $isScrolled }) => ($isScrolled ? 'blur(4px)' : 'none')};
	padding: ${({ $isScrolled }) => ($isScrolled ? `10px 0` : `25px 0`)};

	transition: ${({ $isScrolled }) =>
		$isScrolled ? `all 0.2s ease-in` : `none`};
`;

export const HeaderWrap = styled.div`
	display: flex;
	gap: 20px;
	z-index: 100;
	max-width: 1360px;
	width: 100%;
	margin: 0 auto;

	@media ${QUERIES.tabletAndDown} {
		display: block;
	}

	.logo-container {
		margin-right: auto;
		display: flex;
		justify-content: center;

		@media ${QUERIES.tabletAndDown} {
			margin-bottom: 20px;
		}
	}
	img {
		max-width: 220px;
		display: block;
	}
	.userNav-container {
		display: flex;
		justify-content: center;
		align-items: center;

		ul {
			display: flex;
			list-style: none;
			padding: 0;

			li {
				display: flex;
				align-items: center;
				margin-right: 30px;

				&:last-child {
					margin-right: 0;
				}

				@media ${QUERIES.tabletAndDown} {
					margin-right: 20px;
					text-align: center;
					span {
						display: none;
					}
				}
			}
		}
	}
`;

import styled from 'styled-components';
import { COLORS, FONTS, QUERIES } from '../../constants';

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

				a {
					display: flex;
					align-items: center;
					text-decoration: none;
					color: ${COLORS.black};
					font-weight: 300;
					font-size: ${FONTS.text.normal};
					letter-spacing: 0.2px;
					position: relative;
					line-height: 2;

					&::before {
						content: '';
						width: 0;
						height: 1.5px;
						border-radius: 2px;
						background-color: #000;
						position: absolute;
						bottom: -0.25rem;
						right: 0;
						transition:
							right 0.4s,
							width 0.4s,
							left 0.4s;
					}

					&:hover::before {
						width: 100%;
						left: 0;
					}

					svg {
						margin-right: 8px;
						min-width: 22px;
						width: 22px;
					}
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

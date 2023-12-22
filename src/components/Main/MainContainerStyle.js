import styled from 'styled-components';
import { QUERIES } from '/src/constants.js';
import useResponsivePadding from '../../hooks/ResponsvieContainer';
import { css } from 'styled-components';

export const Container = styled.div`
	max-width: 1360px;
	width: 100%;
	margin: 0 auto;
	padding: 0 80px;

	/* added by Georgi */
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	align-items: flex-start;

	@media ${QUERIES.laptopAndDown} {
		padding: 0 80px;
	}
`;

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

export const CardHorizontal = styled.div`
	display: flex;
	flex-direction: row;
	align-items: stretch;
	justify-content: space-between;
	background: #fff;
	border-radius: 20px;
	border-radius: 20px;
	overflow: hidden;

	${(props) =>
		props.className === 'login' &&
		css`
			margin-top: 3px;

			@media ${QUERIES.tabletAndDown} {
				flex-direction: column;
			}
		`}
`;

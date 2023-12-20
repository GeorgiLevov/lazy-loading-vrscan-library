import styled from 'styled-components';
import { QUERIES } from '/src/constants.js';

export const Container = styled.div`
	max-width: 1360px;
	width: 100%;
	margin: 0 auto;
	padding: 0 80px;

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


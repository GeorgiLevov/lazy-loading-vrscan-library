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


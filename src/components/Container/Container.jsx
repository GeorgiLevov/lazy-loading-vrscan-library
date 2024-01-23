import styled from 'styled-components';
import useResponsivePadding from '../../hooks/useResponsivePadding';
import { QUERIES, SPACING } from '../../constants';

function Container({ children, style }) {
	const responsivePadding = useResponsivePadding();

	return (
		<StyledContainer style={{ '--padding': responsivePadding, ...style }}>
			{children}
		</StyledContainer>
	);
}

export const StyledContainer = styled.div`
	max-width: 1360px;
	width: 100%;
	margin: 0 auto;
	padding: 0 80px;
	padding: 0 var(--padding);

	@media ${QUERIES.phoneAndDown} {
		padding: 0 ${SPACING.micro};
	}
`;

export default Container;

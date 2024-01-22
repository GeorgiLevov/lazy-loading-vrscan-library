import styled from 'styled-components';
import { QUERIES } from '../../constants';
import PropTypes from 'prop-types';

const CardDetails = ({ children }) => {
	return <StyledCardDetails>{children}</StyledCardDetails>;
};

const StyledCardDetails = styled.section`
	/* assuming the details are a flex-child */
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	align-items: center;

	@media ${QUERIES.tabletAndDown} {
	}
`;
export default CardDetails;

CardDetails.propTypes = {
	children: PropTypes.arrayOf(PropTypes.node),
};

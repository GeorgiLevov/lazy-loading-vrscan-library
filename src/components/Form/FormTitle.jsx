/* c8 ignore start */

import styled from 'styled-components';
import { FONTS } from '../../constants';
import PropTypes from 'prop-types';

function FormTitle({ children }) {
	return <StyledTitle>{children}</StyledTitle>;
}

const StyledTitle = styled.h1`
	display: block;
	font-size: ${FONTS.heading.xl};
`;

export default FormTitle;

FormTitle.proptypes = {
	children: PropTypes.string,
};

/* c8 ignore end */

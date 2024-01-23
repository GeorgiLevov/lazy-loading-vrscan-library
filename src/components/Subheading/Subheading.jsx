import styled from 'styled-components';
import { FONTS } from '../../constants';

function Subheading({ children }) {
	return <StyledSubheading>{children}</StyledSubheading>;
}

const StyledSubheading = styled.h2`
	display: block;
	font-size: ${FONTS.heading.medium};
	padding-bottom: 20px;
`;

export default Subheading;

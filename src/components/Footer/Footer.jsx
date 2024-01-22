import Container from '../Container';
import styled from 'styled-components';
import { SPACING } from '../../constants';
function Footer() {
	return (
		<Container style={{ marginTop: 'auto' }}>
			<FooterText>Team: Georgi Levov & Iva Tsaneva</FooterText>
		</Container>
	);
}

const FooterText = styled.h4`
	font-family: 'Helvetica', sans-serif;
	font-weight: 300;
	text-align: center;
	padding: ${SPACING.large};
`;

export default Footer;

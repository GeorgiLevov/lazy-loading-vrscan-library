import styled from 'styled-components';
import { QUERIES } from '../../constants';
import chaosLogo from '/src/assets/images/chaosgroup-logo.svg';
import Picture from '../Picture';

function Logo() {
	return (
		<LogoContainer>
			<a href="/">
				<StyledLogo src={chaosLogo} alt="ChaosGroup Logo" />
			</a>
		</LogoContainer>
	);
}

const LogoContainer = styled.div`
	margin-right: auto;
	display: flex;
	justify-content: center;
	align-items: center;

	@media ${QUERIES.tabletAndDown} {
		margin-bottom: 20px;
	}
`;

const StyledLogo = styled(Picture)`
	max-width: 220px;
	display: block;
	height: 41px;
	width: 493px;
`;

export default Logo;

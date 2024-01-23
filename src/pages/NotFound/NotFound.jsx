import styled from 'styled-components';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/Button';
import { Home } from 'react-feather';

function NotFound() {
	return (
		<StyledArticle>
			<PageTitle>ERROR - Page Not Found</PageTitle>
			<br />
			<br />
			<Button variant="primary" icon={Home} href="/">
				Back to home
			</Button>
		</StyledArticle>
	);
}

const StyledArticle = styled.article`
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-content: center;
	align-items: center;
`;

export default NotFound;

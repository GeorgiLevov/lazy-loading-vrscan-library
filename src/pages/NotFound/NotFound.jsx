import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function NotFound() {
	return (
		<StyledArticle>
			<Title>ERROR - Page Not Found</Title>
			<br />
			<br />
			<Link to="/">
				<h1>Back to home</h1>
			</Link>
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

const Title = styled.h1`
	font-size: '3rem';
	margin: '64px';
`;

export default NotFound;

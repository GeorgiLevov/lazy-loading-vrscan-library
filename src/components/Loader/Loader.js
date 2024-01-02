import React from 'react';
import styled from 'styled-components';
import LoadingAnimation from './LoadingAnimation';

const Wrapper = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
`;

const Overlay = styled.div`
	position: absolute;
	top: -50%;
	left: 0px;
	right: 0px;
	bottom: 0px;
	width: 150px;
	height: 150px;
	margin: auto;
	border-radius: 50%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Loader = ({ isLoading, children }) => (
	<Wrapper>
		{isLoading ? (
			<Overlay>
				<LoadingAnimation />
			</Overlay>
		) : (
			children
		)}
	</Wrapper>
);

export default Loader;

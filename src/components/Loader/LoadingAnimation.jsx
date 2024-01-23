import styled, { keyframes } from 'styled-components';

const bounceAnimation = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1.0); }
`;

const Dot = styled.div`
	width: 10px;
	height: 10px;
	background-color: #fff;
	border-radius: 50%;
	display: inline-block;
	animation: ${bounceAnimation} 1.4s infinite ease-in-out both;
	margin: 2px;
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const LoadingAnimation = () => (
	<Wrapper data-testid="loading-animation">
		<Dot style={{ animationDelay: '-0.32s' }} />
		<Dot style={{ animationDelay: '-0.16s' }} />
		<Dot />
	</Wrapper>
);

export default LoadingAnimation;

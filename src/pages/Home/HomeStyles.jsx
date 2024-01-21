import styled, { keyframes } from 'styled-components';
import { QUERIES, FONTS } from '../../constants';

const entranceAnimation = keyframes`
  0% {opacity:0}
  60% {opacity:0}
  100% {opacity:1}
`;

export const HomeBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	overflow: hidden;
	z-index: -1;

	&:after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(
				180deg,
				rgba(255, 255, 255, 0.8) 0.38%,
				rgba(238, 238, 238, 0) 206.09%
			),
			url(https://grainy-gradients.vercel.app/noise.svg);
		z-index: 1;
	}
`;

export const StyledVideo = styled.video`
	width: 100%;
	height: 100%;
	object-fit: cover;
	animation: ${entranceAnimation} 2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
`;

export const FlexCenterWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80vh;
	@media ${QUERIES.laptopAndDown} {
		padding: 0 32px;
	}
`;

export const HeroContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	max-width: 600px;
	margin: 0 auto;

	p {
		width: 70%;
		margin-bottom: 30px;
	}

	@media ${QUERIES.tabletAndDown} {
		p {
			width: 100%;
		}
	}
`;

export const HeroTextContainer = styled.div`
	border-radius: 100px;
	border: 1px solid #fff;
	background: rgba(255, 255, 255, 0.2);
	box-shadow: 40px 50px 50px 0px rgba(0, 0, 0, 0.15);
	backdrop-filter: blur(2px);
	width: 100%;
	margin-bottom: 30px;
	user-select: none;

	h1 {
		font-size: ${FONTS.heading.xl};
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		color: #000;
		display: block;
		padding: 20px;
	}

	@media ${QUERIES.tabletAndDown} {
		h1 {
			font-size: 30px;
		}
	}

	@media ${QUERIES.phoneAndDown} {
		h1 {
			font-size: 20;
		}
	}
`;

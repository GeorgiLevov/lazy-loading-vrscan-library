import styled from 'styled-components';
import { QUERIES } from '../../constants';

export const HomeBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	overflow: hidden;
	z-index: -1;

	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

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

	@media ${QUERIES.tabletAndDown} {
		video {
		}
	}
`;


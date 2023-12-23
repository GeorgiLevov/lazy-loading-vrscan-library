import styled from 'styled-components';
import { motion } from 'framer-motion';
import { QUERIES, SPACING } from '../../constants';

export const SliderContainer = styled.div`
	width: 100%;
	min-height: 60vh;
	height: 100%;
	margin: auto;
	overflow: hidden;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	@media ${QUERIES.phoneAndDown} {
		min-height: 40vh;
	}
`;

export const Slide = styled(motion.div)`
	width: 100%;
	height: 100%;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
`;


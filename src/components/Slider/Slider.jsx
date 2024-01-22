/**
 * @module Slider
 * @description This React component renders a slider for cycling through a series of content, such as images.
 * It supports automatic playback and animation for transitioning between slides. The component utilizes `framer-motion`
 * for animations and `CardImage` for rendering individual slide images.
 * @prop {array} contents - Array of content objects to be displayed in the slider.
 * @prop {number} [autoplaySpeed=3000] - Duration in milliseconds before transitioning to the next slide.
 */
import { useState, useEffect } from 'react';
import { SliderContainer, Slide } from './SliderStyles';
import { AnimatePresence } from 'framer-motion';
import CardImage from '../Card/CardImage';
import PropTypes from 'prop-types';

const variants = {
	enter: { y: '-100%', opacity: 0 },
	center: {
		y: 0,
		opacity: 1,
		transition: { opacity: { duration: 0.5 }, y: { duration: 0.5 } },
	},
	exit: {
		y: '100%',
		opacity: 0,
		transition: { opacity: { duration: 0.5 }, y: { duration: 0.5 } },
	},
};

function Slider({ contents, autoplaySpeed = 3000 }) {
	// eslint-disable-next-line no-unused-vars
	const [[page, direction], setPage] = useState([0, 1]);
	const pageIndex = page % contents.length;

	useEffect(() => {
		const timer = setTimeout(() => {
			setPage([page + 1, 1]);
		}, autoplaySpeed + 1000);
		return () => clearTimeout(timer);
	}, [page, autoplaySpeed]);

	return (
		<SliderContainer>
			{contents && (
				<AnimatePresence initial={false}>
					<Slide
						key={page}
						variants={variants}
						initial="enter"
						animate="center"
						exit="exit">
						<CardImage
							src={contents[pageIndex]?.thumb}
							alt={`${contents[pageIndex]?.name} | Image`}
							variant="inverted"
						/>
					</Slide>
				</AnimatePresence>
			)}
		</SliderContainer>
	);
}

export default Slider;

Slider.propTypes = {
	contents: PropTypes.array,
	autoplaySpeed: PropTypes.number,
};


import React, { useState, useEffect } from 'react';
import { SliderContainer, Slide } from './SliderStyles';
import { AnimatePresence } from 'framer-motion';
import CardImage from '../Card/CardImage';

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
						/>
					</Slide>
				</AnimatePresence>
			)}
		</SliderContainer>
	);
}

export default Slider;

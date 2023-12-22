import React, { useState, useEffect } from 'react';
import { SliderContainer, Slide } from './ScanSliderStyles';
import { AnimatePresence } from 'framer-motion';

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

function ScansSlider({ products, autoplaySpeed = 3000 }) {
	const [[page, direction], setPage] = useState([0, 1]);
	const pageIndex = page % products.length;

	useEffect(() => {
		const timer = setTimeout(() => {
			setPage([page + 1, 1]);
		}, autoplaySpeed + 1000);
		return () => clearTimeout(timer);
	}, [page, autoplaySpeed]);

	return (
		<SliderContainer>
			<AnimatePresence initial={false}>
				<Slide
					key={page}
					variants={variants}
					initial="enter"
					animate="center"
					exit="exit">
					<img src={products[pageIndex].image} alt={products[pageIndex].name} />
				</Slide>
			</AnimatePresence>
		</SliderContainer>
	);
}

export default ScansSlider;

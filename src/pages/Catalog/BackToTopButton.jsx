import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowUp } from 'react-feather';
import { COLORS } from '../../constants';

const ScrollButton = styled.button`
	position: fixed;
	bottom: 20px;
	right: 20px;
	background: ${COLORS.primary};
	color: white;
	border: none;
	border-radius: 50%;
	padding: 10px;
	cursor: pointer;
	font-size: 16px;
	z-index: 1000;
	display: ${(props) => (props.$show ? 'block' : 'none')};
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const BackToTopButton = () => {
	const [showTopBtn, setShowTopBtn] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setShowTopBtn(window.scrollY > 300);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<ScrollButton $show={showTopBtn} onClick={scrollToTop}>
			<ArrowUp />
		</ScrollButton>
	);
};

export default BackToTopButton;

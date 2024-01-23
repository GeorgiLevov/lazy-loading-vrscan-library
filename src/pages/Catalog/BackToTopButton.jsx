/**
 * @module BackToTopButton
 * @description This React component provides a "Back to Top" button, which appears when the user scrolls down the page.
 * Clicking the button smoothly scrolls the page back to the top. This component is useful for improving user navigation
 * on long pages. It uses conditional rendering based on the scroll position to either show or hide the button.
 */
import { useState, useEffect } from 'react';
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

	/**
	 * Adds an event listener to the window to detect scroll events.
	 * Updates the `showTopBtn` state based on the scroll position.
	 * @memberof module:BackToTopButton
	 */
	useEffect(() => {
		const handleScroll = () => {
			setShowTopBtn(window.scrollY > 300);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	/**
	 * Scrolls the window to the top when the button is clicked.
	 * @function
	 * @name scrollToTop
	 * @memberof module:BackToTopButton
	 */
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<ScrollButton
			$show={showTopBtn}
			onClick={scrollToTop}
			data-testid="back-to-top-button">
			<ArrowUp />
		</ScrollButton>
	);
};

export default BackToTopButton;

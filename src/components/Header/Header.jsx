/**
 * @module Header
 * @description This React component renders the header section of the application. It includes a logo and user navigation elements. The header's appearance changes based on the page scroll, providing a responsive design. The component utilizes a custom hook, `useResponsivePadding`, to adjust padding based on screen size.
 * @requires React - React library for building UI components.
 * @requires styled-components - Library for styling React components.
 * @requires useResponsivePadding - Custom hook to determine responsive padding.
 * @requires QUERIES - Constants for media queries.
 * @requires Logo - Component for displaying the application logo.
 * @requires UserNav - Component for displaying user navigation elements.
 */
import { useState, useEffect } from 'react';
import useResponsivePadding from '../../hooks/useResponsivePadding';
import styled from 'styled-components';
import { QUERIES } from '../../constants';
import Logo from './Logo';
import UserNav from './UserNav';

function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const responsivePadding = useResponsivePadding();

	/**
	 * Adds an event listener to the window to detect scroll events.
	 * Updates the `isScrolled` state based on the scroll position.
	 */
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<ContainerHeader $isScrolled={isScrolled} data-testid="container-header">
			<HeaderWrap
				style={{ '--padding': responsivePadding }}
				data-testid="header">
				<Logo />
				<UserNav />
			</HeaderWrap>
		</ContainerHeader>
	);
}

export const ContainerHeader = styled.div`
	position: sticky;
	top: 0;
	margin: 0 auto;
	width: 100%;

	z-index: 1000;
	background-color: ${({ $isScrolled }) =>
		$isScrolled ? 'rgba(255, 255, 255, 0.4)' : 'transparent'};
	backdrop-filter: ${({ $isScrolled }) => ($isScrolled ? 'blur(4px)' : 'none')};
	padding: ${({ $isScrolled }) => ($isScrolled ? `10px 0` : `25px 0`)};

	transition: ${({ $isScrolled }) =>
		$isScrolled ? `all 0.2s ease-in` : `none`};
`;

export const HeaderWrap = styled.div`
	display: flex;
	gap: 20px;
	z-index: 100;
	max-width: 1360px;
	width: 100%;
	margin: 0 auto;
	padding: 0 80px;
	padding: 0 var(--padding);

	@media ${QUERIES.tabletAndDown} {
		display: block;
	}
`;

export default Header;


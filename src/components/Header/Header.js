import { useState, useEffect } from 'react';
import useResponsivePadding from '../../hooks/ResponsvieContainer';
import styled from 'styled-components';
import { QUERIES } from '../../constants';
import Logo from './Logo';
import UserNav from './UserNav';

function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const responsivePadding = useResponsivePadding();

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
		<ContainerHeader $isScrolled={isScrolled}>
			<HeaderWrap style={{ '--padding': responsivePadding }}>
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

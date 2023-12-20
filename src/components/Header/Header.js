import React, { useState, useEffect } from 'react';
import { ContainerHeader } from '../Main/MainContainerStyle';
import useResponsivePadding from '../../hooks/ResponsvieContainer';
import Logo from './Logo';
import UserNav from './UserNav';
import { HeaderWrap } from './HeaderStylings';

function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const padding = useResponsivePadding();

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
		<ContainerHeader className="header" $isScrolled={isScrolled}>
			<HeaderWrap style={{ padding: `0 ${padding}` }}>
				<Logo />
				<UserNav />
			</HeaderWrap>
		</ContainerHeader>
	);
}

export default Header;


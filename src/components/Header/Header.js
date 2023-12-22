import React, { useState, useEffect } from 'react';
import useResponsivePadding from '../../hooks/ResponsvieContainer';

import { ContainerHeader, HeaderWrap } from './HeaderStylings';

function Header({ children }) {
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
			<HeaderWrap style={{ padding: `0 ${padding}` }}>{children}</HeaderWrap>
		</ContainerHeader>
	);
}

export default Header;

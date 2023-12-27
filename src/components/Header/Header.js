import React, { useState, useEffect } from 'react';
import useResponsivePadding from '../../hooks/ResponsvieContainer';
import { ContainerHeader, HeaderWrap } from './HeaderStylings';
import { useUser } from '../../../api/context/user.context';
import Logo from './Logo';
import UserNav from './UserNav';

function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const padding = useResponsivePadding();
	const { user } = useUser();

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
				{user && <UserNav name={user.name} />}
			</HeaderWrap>
		</ContainerHeader>
	);
}

export default Header;


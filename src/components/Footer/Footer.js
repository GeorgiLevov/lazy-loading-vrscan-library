import React from 'react';
import { Container } from '../Main/MainContainerStyle';
import useResponsivePadding from '../../hooks/ResponsvieContainer';


function Footer() {
	const padding = useResponsivePadding();
	return (
		
		<Container style={{ padding: `0 ${padding}`}}>
			<div className='footerNote>'><p align="center">Team: Georgi Levov & Iva Tsaneva</p></div>
		</Container>
		
		
	);
}

export default Footer;

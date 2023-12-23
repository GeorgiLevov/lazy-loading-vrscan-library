import React from 'react';
import Container from '../../components/Container';
import useResponsivePadding from '../../hooks/ResponsvieContainer';
import Header from '../../components/Header/Header';

function Catalog() {
	const padding = useResponsivePadding();

	return (
		<>
			<Header />
			<Container style={{ padding: `0 ${padding}` }}>
				<h1>Catalog page</h1>

				<a href="#">Link to something</a>
			</Container>
		</>
	);
}

export default Catalog;


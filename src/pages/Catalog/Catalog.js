import React from 'react';
import { Container } from '../../components/Main/MainContainerStyle';
import useResponsivePadding from '../../hooks/ResponsvieContainer';

function Catalog() {
	const padding = useResponsivePadding();

	return (
		<Container style={{ padding: `0 ${padding}` }}>
			<h1>Catalog page</h1>

			<a href="#">Link to something</a>
		</Container>
	);
}

export default Catalog;


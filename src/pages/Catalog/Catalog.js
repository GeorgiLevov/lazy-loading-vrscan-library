import React from 'react';
import Header from '../../components/Header/Header';
import Main from '../../components/Main';
import Filters from './Filters';

function Catalog() {
	return (
		<>
			<Header />
			<Main>
				<h1>Catalog page</h1>
				<Filters />
			</Main>
		</>
	);
}

export default Catalog;


import React from 'react';
import { Container } from './CatalogStyles';
import useResponsivePadding from './ResponsvieContainer';

function Catalog() {
	const padding = useResponsivePadding();

	return (
		<Container style={{ padding: `0 ${padding}` }}>
			<h1>Testing app</h1>
			<p>
				Lorem Ipsum is simply dummy text of the printing and typesetting
				industry...
			</p>
			<video
				src="https://res.cloudinary.com/boil-agency/video/upload/v1702747030/Chaos_Scans_Library_Various_Material_Samples_p9pttt.mp4"
				type="video/mp4"
				muted
				loop
				autoPlay={'autoplay'}
			/>
			<a href="#">Link to something</a>
		</Container>
	);
}

export default Catalog;


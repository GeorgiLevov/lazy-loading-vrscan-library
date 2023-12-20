import React from 'react';
import Header from '../../components/Header/Header';
import { HomeBackground } from './HomeBackgroundStyle';
import { Container } from '../../components/Main/MainContainerStyle';
import useResponsivePadding from '../../hooks/ResponsvieContainer';

function Home() {
	const padding = useResponsivePadding();
	return (
		<>
			<Header />
			<HomeBackground>
				<video
					src="https://res.cloudinary.com/boil-agency/video/upload/v1702747030/Chaos_Scans_Library_Various_Material_Samples_p9pttt.mp4"
					type="video/mp4"
					muted
					loop
					autoPlay
					playsInline
				/>
			</HomeBackground>
			<Container style={{ padding: `0 ${padding}` }}>
				<h1>VRScansLibrary</h1>
				<p>
					React-based load-on-demand library showing VRScans materials from a
					pre-defined REST API
				</p>
				<a href="/login">Login</a>
			</Container>
		</>
	);
}

export default Home;


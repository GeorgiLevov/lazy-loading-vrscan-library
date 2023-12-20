import React from 'react';
import Header from '../../components/Header/Header';
import { HomeBackground } from './HomeBackgroundStyle';

function Home() {
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
		</>
	);
}

export default Home;


import React from 'react';
import Header from '../../components/Header/Header';
import { HomeBackground, HeroContainer, FlexCenterWrapper, ButtonPrimary } from './HomeStyles';
import { Container } from '../../components/Main/MainContainerStyle';
import useResponsivePadding from '../../hooks/ResponsvieContainer';
import HeroText from './HeroText';
import { ArrowRight, Compass } from 'feather-icons-react/build/IconComponents';
import Footer from '../../components/Footer/Footer';

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
			
			<Container style={{ padding: `0 ${padding}`}}>
			<FlexCenterWrapper>
					<HeroContainer>
						<HeroText/>
						<p>
							React-based load-on-demand library showing VRScans materials from a
							pre-defined REST API
						</p>
						<ButtonPrimary href='/login'> Sign In <ArrowRight strokeWidth="1.1"/></ButtonPrimary>
						<p></p>
						<ButtonPrimary href='/login'> Explore Library <Compass strokeWidth="1.1"/></ButtonPrimary>
					</HeroContainer>
				</FlexCenterWrapper>
			</Container>
			<Footer/>
		</>
	);
}

export default Home;


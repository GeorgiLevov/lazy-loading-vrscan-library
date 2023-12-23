import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import { HomeBackground, HeroContainer, FlexCenterWrapper } from './HomeStyles';
import HeroText from './HeroText';
import { Compass, ArrowRight } from 'react-feather';
import Footer from '../../components/Footer/Footer';
import Main from '../../components/Main';
import { useUser } from '../../../api/context/user.context';
import Button from '../../components/Button/Button';

function Home() {
	const { user } = useUser();
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

			<Main>
				<FlexCenterWrapper>
					<HeroContainer>
						<HeroText />
						<p>
							React-based load-on-demand library showing VRScans materials from
							a pre-defined REST API
						</p>
						{user ? (
							<Button
								href="/catalog"
								variant="icon"
								icon={Compass}
								size="large">
								Explore Library
							</Button>
						) : (
							<Button
								href="/login"
								variant="icon"
								icon={ArrowRight}
								size="large">
								Sign In
							</Button>
						)}
					</HeroContainer>
				</FlexCenterWrapper>
			</Main>
			<Footer />
		</>
	);
}

export default Home;

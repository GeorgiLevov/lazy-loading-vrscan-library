import React from 'react';
import Header from '../../components/Header/Header';
import { HomeBackground, HeroContainer, FlexCenterWrapper } from './HomeStyles';
import useResponsivePadding from '../../hooks/ResponsvieContainer';
import HeroText from './HeroText';
import { ArrowRight, Compass } from 'feather-icons-react/build/IconComponents';
import Footer from '../../components/Footer/Footer';
import Main from '../../components/Main';
import { useUser } from '../../../api/context/user.context';
import Logo from '../../components/Header/Logo';
import UserNav from '../../components/Header/UserNav';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';

function Home() {
	const { user } = useUser();
	return (
		<>
			<Header>
				<Logo />
				{user && <UserNav />}
			</Header>
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
							<Link to="/catalog">
								<Button variant="icon" size="large">
									Explore Library <Compass strokeWidth="1.1" />
								</Button>
							</Link>
						) : (
							<Link to="/login">
								<Button variant="icon" size="large">
									Sign In <ArrowRight strokeWidth="1.1" />
								</Button>
							</Link>
						)}
					</HeroContainer>
				</FlexCenterWrapper>
			</Main>
			<Footer />
		</>
	);
}

export default Home;

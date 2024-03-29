/**
 * Home component representing the main page of the application.
 * @module Home
 * @component
 * @requires React
 * @requires Header
 * @requires HomeStyles
 * @requires HeroText
 * @requires react-feather
 * @requires Footer
 * @requires user.context
 * @requires Button
 */

import { useSelector } from 'react-redux';
import { Compass, ArrowRight } from 'react-feather';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import {
	HomeBackground,
	HeroContainer,
	FlexCenterWrapper,
	StyledVideo,
} from './HomeStyles';
import HeroText from './HeroText';
import backgroundVideo from '../../assets/background_video_small.mp4';

/**
 * @module Home
 * @description The main page component of the application, showcasing the hero section,
 * user interaction, and navigation options.
 * @returns {React.Component} The Home component rendered as the main page of the application.
 */

function Home() {
	/**
	 * User context hook for accessing user information and logout function.
	 * @name useUser
	 * @type {Object}
	 * @property {Object} user - User information.
	 * @property {Function} logout - Logout function.
	 */

	const { isLoggedIn } = useSelector((state) => state.user);

	return (
		<>
			<Header />
			<HomeBackground>
				<StyledVideo
					src={backgroundVideo}
					type="video/mp4"
					muted
					loop
					autoPlay
					playsInline
				/>
			</HomeBackground>

			{/* Flex container for centering */}
			<FlexCenterWrapper>
				{/* Container for hero section */}
				<HeroContainer>
					{/* HeroText component */}
					<HeroText />
					{/* Description */}
					<p>
						React-based load-on-demand library showing VRScans materials from a
						pre-defined REST API
					</p>
					{/* Conditional rendering based on user authentication */}
					{isLoggedIn ? (
						<>
							{/* Explore Library button */}
							<Button
								href="/catalog"
								variant="primary"
								icon={Compass}
								size="large">
								Explore Library
							</Button>
						</>
					) : (
						<Button
							href="/login"
							variant="primary"
							icon={ArrowRight}
							size="large">
							Sign In
						</Button>
					)}
				</HeroContainer>
			</FlexCenterWrapper>

			<Footer />
		</>
	);
}

export default Home;

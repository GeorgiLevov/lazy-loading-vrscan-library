/**
 * @module Login
 * @description This React component renders the login page for the application. It includes a header, a main content area with a sign-in form, and utilizes the `useVRScans` context for functionality related to VR scans. The `Card` component is used to present the sign-in form in a styled container.
 *
 * @requires Header - Header component for the top section of the page.
 * @requires Main - Main component to wrap the primary content area.
 * @requires Card - Card component to display content in a styled box.
 * @requires SignInForm - Component for rendering the sign-in form.
 * @requires useVRScans - Context hook for VR scans related functionality.
 */

import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import Card from '../../components/Card/Card';
import SignInForm from '../../components/Form/SignInForm';
import { useVRScans } from '../../../api/context/vrscans.context';

function Login() {
	const { loginVRScans } = useVRScans();
	return (
		<>
			<Header />
			<Main>
				<Card variant="inverted" imageSrc={loginVRScans}>
					<SignInForm />
				</Card>
			</Main>
		</>
	);
}

export default Login;


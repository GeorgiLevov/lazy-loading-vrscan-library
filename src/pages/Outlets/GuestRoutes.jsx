/* c8 ignore start */
/**
 * @module GuestRoutes
 * @description This React component handles routing for guests (unauthenticated users) in the application.
 * It uses the user's authentication status from Redux state to determine which routes should be accessible
 * to a guest. If a user is authenticated, they are redirected to the home page; otherwise, they can access
 * guest routes.
 *
 * @requires react-redux
 * @requires react-router-dom
 */
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Determines the component to render based on the authentication status of the user.
 * If the user's status is 'success' and they are authenticated, the function redirects to the home page.
 * If the user's status is not 'success' or they are not authenticated, it renders the child routes (Outlet).
 * @function
 * @name renderRoutes
 * @memberof module:GuestRoutes
 * @returns {JSX.Element} The JSX element for either the Outlet (for guest routes) or Navigate (for redirect).
 */

const GuestRoutes = () => {
	const homePagePath = '/';
	const { data: user, status } = useSelector((state) => state.user);

	if (status === 'success') {
		return !user ? <Outlet /> : <Navigate replace to={homePagePath} />;
	} else if (!user) {
		return <Outlet />;
	}
};

export default GuestRoutes;

/* c8 ignore end */

/* c8 ignore end */

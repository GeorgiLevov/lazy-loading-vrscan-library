/* c8 ignore start */
/**
 * @module UserRoutes
 * @description This React component manages routing for authenticated users in the application.
 * It checks the user's authentication status to determine access to protected routes.
 * If the user is authenticated, it renders the child routes (Outlet). If not, it redirects the user
 * to the login page. This component is essential for implementing protected routes in the application.
 *
 * @requires react-router-dom
 * @requires react-redux
 * @requires getUserLocalStatus - A function from the Redux store to check the local authentication status.
 */

import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserLocalStatus } from '../../redux/store/user';

const UserRoutes = () => {
	const loginPagePath = '/login';

	const { data: user, isLoggedIn } = useSelector((state) => state.user);

	if (isLoggedIn) {
		return user ? <Outlet /> : <Navigate replace to={loginPagePath} />;
	} else if (!getUserLocalStatus()) {
		return <Navigate replace to={loginPagePath} />;
	}
};
export default UserRoutes;

/* c8 ignore end */

/* c8 ignore end */

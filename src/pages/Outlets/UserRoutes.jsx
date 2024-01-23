/* c8 ignore start */
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

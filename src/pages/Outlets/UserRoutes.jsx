import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserRoutes = () => {
	const loginPagePath = '/login';

	const { data: user, isLoggedIn } = useSelector((state) => state.user);

	if (isLoggedIn) {
		return user ? <Outlet /> : <Navigate replace to={loginPagePath} />;
	}
};

export default UserRoutes;

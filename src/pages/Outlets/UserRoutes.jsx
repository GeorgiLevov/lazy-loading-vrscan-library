import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserRoutes = () => {
	const { data: user } = useSelector((state) => state.user);
	const loginPagePath = '/login';
	const loadingCounter = useSelector((state) => state.loader.loadingCounter);

	if (user) {
		return <Outlet />;
	} else if (!user && loadingCounter === 0) {
		return <Navigate replace to={loginPagePath} />;
	}
};

export default UserRoutes;

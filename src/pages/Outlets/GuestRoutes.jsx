/* c8 ignore start */
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

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

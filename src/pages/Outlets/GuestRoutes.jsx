import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const GuestRoutes = () => {
	const { data: user } = useSelector((state) => state.user);
	const loadingCounter = useSelector((state) => state.loader.loadingCounter);
	const homePagePath = '/';

	if (!user && loadingCounter === 0) {
		return <Outlet />;
	} else if (user) {
		return <Navigate replace to={homePagePath} />;
	}
};

export default GuestRoutes;

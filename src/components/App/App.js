import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '../../pages/Home';
import Favorites from '../../pages/Favorites';
import Catalog from '../../pages/Catalog';
import Login from '../../pages/Login';
import Reviews from '../../pages/Reviews';
import Profile from '../../pages/Profile';
import NotFound from '../../pages/NotFound';
import { VRScansProvider } from '../../../api/context/vrscans.context';
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/slices/userSlice';
import UserRoutes from '../../pages/Outlets/UserRoutes';
import GuestRoutes from '../../pages/Outlets/GuestRoutes';
import {
	decrementLoadingCounter,
	incrementLoadingCounter,
} from '../../redux/slices/loaderSlice';

const UserProvider = ({ children }) => {
	const dispatch = useDispatch();
	dispatch(incrementLoadingCounter());

	const getSession = async () => {
		await dispatch(getUser());
		dispatch(decrementLoadingCounter());
	};

	getSession();

	return children;
};

function App() {
	const location = useLocation();

	return (
		<>
			<UserProvider>
				<VRScansProvider>
					<Routes location={location} key={location.pathname}>
						<Route index path="/" element={<Home />} />

						{/* Outlet */}
						<Route element={<UserRoutes />}>
							{/* Index */}
							<Route path="/catalog" element={<Catalog />} />
							<Route path="/profile" element={<Profile />} />
							<Route path="/reviews" element={<Reviews />} />
							<Route path="/favorites" element={<Favorites />} />
						</Route>

						{/* Outlet */}
						<Route element={<GuestRoutes />}>
							<Route path="/login" element={<Login />} />
						</Route>

						{/* 404 page */}
						<Route path="*" element={<NotFound />} />
					</Routes>
				</VRScansProvider>
			</UserProvider>
		</>
	);
}

export default App;

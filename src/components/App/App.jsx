/**
 * @module App
 * @description This React component is the main entry point for the application. It sets up routing for different pages
 * and provides context providers for global state management. The component uses React Router for navigation and
 * conditional rendering of components based on the route. It includes a custom `UserProvider` for managing user session
 * state and a `VRScansProvider` for providing VR scans related context.
 *
 * @requires useLayoutEffect from React - Hook for performing side effects with DOM layout dependencies.
 * @requires Routes, Route, useLocation from react-router-dom - Components and hooks for routing in a React application.
 * @requires Home, Favorites, Catalog, Login, Reviews, Profile, NotFound - Pages components for respective routes.
 * @requires VRScansProvider - Context provider for VR scans related data.
 * @requires useDispatch from react-redux - Hook for dispatching Redux actions.
 * @requires getUser from userSlice - Redux action for fetching user data.
 * @requires UserRoutes, GuestRoutes - Outlet components for handling user and guest-specific routes.
 * @requires getUserLocalStatus - Utility function for fetching local user session status.
 */

import { useLayoutEffect } from 'react';
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
import { getUserLocalStatus } from '../../redux/store/user';

const UserProvider = ({ children }) => {
	const dispatch = useDispatch();
	const getSession = async () => {
		await dispatch(getUser());
	};

	const userSession = getUserLocalStatus();

	useLayoutEffect(() => {
		if (userSession) {
			getSession();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return children;
};

function App() {
	const location = useLocation();
	return (
		<>
			<UserProvider>
				<VRScansProvider>
					<Routes location={location} key={location.pathname}>
						{/* Index */}
						<Route index path="/" element={<Home />} />
						{/* Outlet */}
						<Route element={<UserRoutes />}>
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


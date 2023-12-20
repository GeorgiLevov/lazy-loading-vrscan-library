import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import GlobalStyles from '../../../GlobalStyles';
import Home from '../../pages/Home';
import Favorites from '../../pages/Favorites';
import Catalog from '../../pages/Catalog';
import Login from '../../pages/Login';
import Reviews from '../../pages/Reviews';
import Profile from '../../pages/Profile';
import NotFound from '../../pages/NotFound';
import { UserProvider } from '../../../api/context/user.context';

function App() {
	const location = useLocation();

	return (
		<>
			<UserProvider>
				<Routes location={location} key={location.pathname}>
					{/* Routes */}
					<Route index path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/" element={<Catalog />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/profile/reviews" element={<Reviews />} />
					<Route path="/profile/favorites" element={<Favorites />} />
					{/* prettier-ignore */}
					<Route path="/reviews" element={<Navigate to="/profile/reviews" />} />
					{/* prettier-ignore */}
					<Route path="/favorites" element={<Navigate to="/profile/favorites" />} />

					{/* 404 page */}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</UserProvider>

			<GlobalStyles />
		</>
	);
}

export default App;

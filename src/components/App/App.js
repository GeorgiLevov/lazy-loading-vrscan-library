import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import GlobalStyles from '../../../GlobalStyles';
import Landing from '../../pages/Landing';
import Favorites from '../../pages/Favorites';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Reviews from '../../pages/Reviews';
import Profile from '../../pages/Profile';
import NotFound from '../../pages/NotFound';

function App() {
	const location = useLocation();

	return (
		<>
			<h1>VRScans!</h1>

			<Routes location={location} key={location.pathname}>
				{/* Routes */}
				<Route index path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/welcome" element={<Landing />} />
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

			<GlobalStyles />
		</>
	);
}

export default App;

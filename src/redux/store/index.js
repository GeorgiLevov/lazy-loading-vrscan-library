import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import loaderReducer from '../slices/loaderSlice';

const store = configureStore({
	reducer: {
		user: userReducer,
		loader: loaderReducer,
	},
});

export default store;

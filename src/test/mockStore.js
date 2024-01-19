import { configureStore, createSlice } from '@reduxjs/toolkit';

// We don't care about the redux implementation - we only care aobut the
// We only care about the state the app will be in once the store is applied

const createMockStore = (passedState) => {
	const mockedUser = createSlice({
		name: 'user',
		initialState: passedState,
		reducers: {},
	});

	const userReducer = mockedUser.reducer;

	return configureStore({ reducer: { user: userReducer } });
};

export default createMockStore;

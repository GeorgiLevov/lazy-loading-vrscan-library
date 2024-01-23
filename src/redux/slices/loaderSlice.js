/* c8 ignore start */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loadingCounter: 0,
};

export const loaderSlice = createSlice({
	name: 'loader',
	initialState,
	reducers: {
		incrementLoadingCounter: (state) => {
			state.loadingCounter += 1;
		},
		decrementLoadingCounter: (state) => {
			state.loadingCounter -= 1;
		},
	},
});

export const { incrementLoadingCounter, decrementLoadingCounter } =
	loaderSlice.actions;

export default loaderSlice.reducer;

/* c8 ignore end */

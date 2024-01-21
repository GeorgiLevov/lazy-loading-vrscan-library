import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	createSession,
	deleteSessions,
	createAccount,
	getCurrentUser,
	getCurrentSession,
	setEmptyUserPreferences,
	updateUserEmail,
	updateUserName,
	updateUserPreferences,
	updateProfileImage,
	setUserLocalStatus,
} from '../store/user';

const initialState = {
	status: 'idle', // 'idle' | 'loading' | 'success' | 'failed'
	isLoggedIn: false,
	data: null,
	error: '',
};

export const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(signup.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(signup.fulfilled, (state, action) => {
				state.status = 'success';
				state.error = '';
				state.isLoggedIn = true;
				state.data = action.payload;
			})
			.addCase(signup.rejected, (state, action) => {
				state.status = 'failed';
				state.isLoggedIn = false;
				state.data = null;
				state.error = action.error.message;
			})
			.addCase(login.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(login.fulfilled, (state, action) => {
				state.status = 'success';
				state.error = '';
				state.isLoggedIn = true;
				state.data = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.status = 'failed';
				state.isLoggedIn = false;
				state.data = null;
				state.error = action.error.message;
			})
			.addCase(logout.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(logout.fulfilled, (state) => {
				state.status = 'success';
				state.error = '';
				state.isLoggedIn = false;
				state.data = null;
			})
			.addCase(logout.rejected, (state, action) => {
				state.status = 'failed';
				state.isLoggedIn = false;
				state.data = null;
				state.error = action.error.message;
			})
			.addCase(getUser.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.status = 'success';
				state.error = '';
				state.isLoggedIn = true;
				state.data = action.payload;
			})
			.addCase(getUser.rejected, (state, action) => {
				state.status = 'failed';
				state.isLoggedIn = false;
				state.data = null;
				state.error = action.error.message;
			})
			.addCase(updatePhoto.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updatePhoto.fulfilled, (state, action) => {
				state.status = 'success';
				state.error = '';
				state.data = action.payload;
			})
			.addCase(updatePhoto.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(updateName.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updateName.fulfilled, (state, action) => {
				state.status = 'success';
				state.error = '';
				state.data.name = action.payload;
			})
			.addCase(updateName.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(updateEmail.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updateEmail.fulfilled, (state, action) => {
				state.status = 'success';
				state.error = '';
				state.data.email = action.payload;
			})
			.addCase(updateEmail.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(updatePrefs.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updatePrefs.fulfilled, (state, action) => {
				state.status = 'success';
				state.error = '';
				state.data = action.payload;
			})
			.addCase(updatePrefs.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const signup = createAsyncThunk(
	'user/signup',
	async ({ firstName, lastName, email, password }) => {
		const createdAccount = await createAccount({
			username: `${firstName} ${lastName}`,
			email,
			password,
		});
		if (createdAccount) {
			const session = await createSession({ email, password });
			if (session) {
				setUserLocalStatus(true);
				await setEmptyUserPreferences();
				return session;
			}
		}
	}
);

export const login = createAsyncThunk(
	'user/login',
	async ({ email, password }) => {
		const session = await createSession({ email, password });
		if (session) {
			setUserLocalStatus(true);
			return await getCurrentUser();
		}
	}
);

export const logout = createAsyncThunk('user/logout', async () => {
	await deleteSessions();
});

export const getSession = createAsyncThunk('user/getSession', async () => {
	const session = await getCurrentSession();
	if (session) {
		return session;
	}
});
export const getUser = createAsyncThunk('user/getUser', async () => {
	const user = await getCurrentUser();
	if (user) {
		return user;
	}
});

export const updatePhoto = createAsyncThunk(
	'user/updatePhoto',
	async (uploadedFile) => {
		const profilePhoto = await updateProfileImage(uploadedFile);
		if (profilePhoto) {
			return await updateUserPreferences({ photo: profilePhoto });
		}
	}
);

export const updateName = createAsyncThunk(
	'user/updateName',
	async (fullName) => {
		return await updateUserName(fullName);
	}
);

export const updateEmail = createAsyncThunk(
	'user/updateEmail',
	async ({ email, password }) => {
		return await updateUserEmail({ email, password });
	}
);
export const updatePrefs = createAsyncThunk(
	'user/updatePrefs',
	async (prefs) => {
		return await updateUserPreferences(prefs);
	}
);

export default userSlice.reducer;

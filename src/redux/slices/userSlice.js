/**
 * @module userSlice
 * @description This Redux slice manages the state related to user authentication, account details, and preferences.
 * It defines asynchronous thunks for various user-related operations like signup, login, logout, and updating user information.
 * The slice handles all the state changes based on the success or failure of these operations.
 *
 * @requires @reduxjs/toolkit
 * @requires ../store/user - Functions for user account management and session handling.
 */
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

/**
 * Asynchronous thunk for user signup.
 * Creates a new user account and establishes a session for the user.
 * @async
 * @function signup
 * @param {Object} userData - User data for account creation.
 * @param {string} userData.firstName - User's first name.
 * @param {string} userData.lastName - User's last name.
 * @param {string} userData.email - User's email address.
 * @param {string} userData.password - User's password.
 * @returns {Promise<Object>} A promise that resolves to the user's account details.
 */
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
				const user = await getCurrentUser();
				if (user) {
					return user;
				}
			}
		}
	}
);

/**
 * Asynchronous thunk for user login.
 * Creates a session for the user and fetches user details.
 * @async
 * @function login
 * @param {Object} loginData - User's login credentials.
 * @param {string} loginData.email - User's email address.
 * @param {string} loginData.password - User's password.
 * @returns {Promise<Object>} A promise that resolves to the user's account details.
 */
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

/**
 * Asynchronous thunk for user logout.
 * Deletes the user's sessions and updates local status.
 * @async
 * @function logout
 * @returns {Promise<void>} A promise that resolves when the user is logged out.
 */
export const logout = createAsyncThunk('user/logout', async () => {
	await deleteSessions();
});

/**
 * Asynchronous thunk for fetching the current user session.
 * @async
 * @function getSession
 * @returns {Promise<Object>} A promise that resolves to the current session data.
 */
export const getSession = createAsyncThunk('user/getSession', async () => {
	const session = await getCurrentSession();
	if (session) {
		return session;
	}
});

/**
 * Asynchronous thunk for fetching the current user data.
 * @async
 * @function getUser
 * @returns {Promise<Object>} A promise that resolves to the current user's data.
 */
export const getUser = createAsyncThunk('user/getUser', async () => {
	const user = await getCurrentUser();
	if (user) {
		return user;
	}
});

/**
 * Asynchronous thunk for updating the user's profile photo.
 * @async
 * @function updatePhoto
 * @param {File} uploadedFile - The new file to be set as the user's profile photo.
 * @returns {Promise<Object>} A promise that resolves to the updated user preferences.
 */
export const updatePhoto = createAsyncThunk(
	'user/updatePhoto',
	async (uploadedFile) => {
		const profilePhoto = await updateProfileImage(uploadedFile);
		if (profilePhoto) {
			return await updateUserPreferences({ photo: profilePhoto });
		}
	}
);

/**
 * Asynchronous thunk for updating the user's name.
 * @async
 * @function updateName
 * @param {string} fullName - The new full name of the user.
 * @returns {Promise<string>} A promise that resolves to the updated name of the user.
 */
export const updateName = createAsyncThunk(
	'user/updateName',
	async (fullName) => {
		return await updateUserName(fullName);
	}
);

/**
 * Asynchronous thunk for updating the user's email.
 * @async
 * @function updateEmail
 * @param {Object} emailData - New email details.
 * @param {string} emailData.email - The new email address.
 * @param {string} emailData.password - The current password for verification.
 * @returns {Promise<string>} A promise that resolves to the updated email of the user.
 */
export const updateEmail = createAsyncThunk(
	'user/updateEmail',
	async ({ email, password }) => {
		return await updateUserEmail({ email, password });
	}
);

/**
 * Asynchronous thunk for updating the user's preferences.
 * @async
 * @function updatePrefs
 * @param {Object} prefs - The new preferences to be updated.
 * @returns {Promise<Object>} A promise that resolves to the updated user preferences.
 */
export const updatePrefs = createAsyncThunk(
	'user/updatePrefs',
	async (prefs) => {
		return await updateUserPreferences(prefs);
	}
);

export default userSlice.reducer;


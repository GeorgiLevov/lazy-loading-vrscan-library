/**
 * @module BackendServices
 * @description This module contains functions for interacting with the backend services related to user accounts,
 * sessions, and preferences. It includes functionalities like creating sessions, managing user accounts,
 * updating preferences, and handling user authentication status.
 */
import {
	account,
	storage,
	storageBucket,
	avatars,
} from '../../../api/appwrite';
import { ID } from 'appwrite';

/**
 * Creates a session for a user with their email and password.
 * @async
 * @function createSession
 * @param {Object} credentials - The user's login credentials.
 * @param {string} credentials.email - The user's email address.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise} A promise that resolves to the created session.
 */
async function createSession({ email, password }) {
	try {
		return await account.createEmailSession(email, password);
	} catch (error) {
		console.error("Backend: 'login' error:", error);
		throw error;
	}
}

/**
 * Deletes all sessions for the current user and updates the local user status.
 * @async
 * @function deleteSessions
 * @returns {Promise} A promise that resolves when the sessions are deleted.
 */
async function deleteSessions() {
	try {
		await account.deleteSessions();
		setUserLocalStatus(false);
	} catch (error) {
		console.error("Backend service: 'logout' error:", error);
		throw error;
	}
}

/**
 * Sets empty user preferences on account creation.
 * @async
 * @function setEmptyUserPreferences
 * @returns {Promise} A promise that resolves when the preferences are set.
 */
async function setEmptyUserPreferences() {
	await account.updatePrefs({
		favorites: [],
		photo: avatars.getInitials(),
	});
}

/**
 * Creates a new user account with the provided username, email, and password.
 * @async
 * @function createAccount
 * @param {Object} accountDetails - Details for the new account.
 * @param {string} accountDetails.username - The user's chosen username.
 * @param {string} accountDetails.email - The user's email address.
 * @param {string} accountDetails.password - The user's chosen password.
 * @returns {Promise} A promise that resolves to the created user account.
 */
async function createAccount({ username, email, password }) {
	try {
		const userID = ID.unique();
		return await account.create(userID, email, password, username);
	} catch (error) {
		console.error("Backend service: 'signup' error:", error);
		throw error;
	}
}

/**
 * Retrieves the local status of the user from localStorage.
 * @function getUserLocalStatus
 * @returns {boolean|Object} The local user status or state, parsed from localStorage.
 */
export function getUserLocalStatus() {
	try {
		const localUserStateKey = Object.keys(localStorage).filter((key) =>
			key.startsWith('vrscan_user_')
		)[0];
		// returning the value
		if (typeof localUserStateKey !== 'undefined') {
			return JSON.parse(localStorage[localUserStateKey]);
		}
	} catch (error) {
		console.error('Error fetching user local state:', error);
		throw error;
	}
}

/**
 * Sets the local status of the user in localStorage.
 * @function setUserLocalStatus
 * @param {boolean|Object} status - The user's status to be stored locally.
 */
export function setUserLocalStatus(status) {
	try {
		localStorage.setItem(`vrscan_user_`, JSON.stringify(status));
	} catch (error) {
		console.error('Error setting user local state:', error);
		throw error;
	}
}

/**
 * Fetches the current session of the authenticated user.
 * @async
 * @function getCurrentSession
 * @returns {Promise<Object>} A promise that resolves to the current user session.
 */
async function getCurrentSession() {
	try {
		const session = await account.getSession('current');
		return session;
	} catch (error) {
		console.error('Error fetching user session:', error);
		throw error;
	}
}

/**
 * Retrieves the currently authenticated user's details.
 * @async
 * @function getCurrentUser
 * @returns {Promise<Object>} A promise that resolves to the current user's data.
 */
async function getCurrentUser() {
	try {
		const user = await account.get();
		if (user) {
			return user;
		}
	} catch (error) {
		console.error('Error fetching user session:', error);
		throw error;
	}
}

/**
 * Fetches the current user's preferences.
 * @async
 * @function getCurrentPreferences
 * @returns {Promise<Object>} A promise that resolves to the current user's preferences.
 */
async function getCurrentPreferences() {
	try {
		return await account.getPrefs();
	} catch (error) {
		console.error('Error fetching user preferences:', error);
		throw error;
	}
}

/**
 * Updates the email address for the current user.
 * @async
 * @function updateUserEmail
 * @param {Object} emailDetails - Details for updating the email.
 * @param {string} emailDetails.email - New email address.
 * @param {string} emailDetails.password - Current user password for verification.
 * @returns {Promise<string>} A promise that resolves to the updated email address.
 */
async function updateUserEmail({ email, password }) {
	try {
		const updatedEmail = await account.updateEmail(email, password);
		if (updatedEmail) return email;
	} catch (error) {
		console.error("Backend service: 'update email' error:", error);
		throw error;
	}
}

/**
 * Updates the name for the current user.
 * @async
 * @function updateUserName
 * @param {string} newName - New name for the user.
 * @returns {Promise<string>} A promise that resolves to the updated user name.
 */
async function updateUserName(newName) {
	try {
		const updatedName = await account.updateName(newName);
		if (updatedName) return newName;
	} catch (error) {
		console.error("Backend service: 'update name' error:", error);
		throw error;
	}
}

/**
 * Updates the preferences for the current user.
 * @async
 * @function updateUserPreferences
 * @param {Object} newPreferenceObject - New preferences to be updated.
 * @returns {Promise<Object>} A promise that resolves to the updated user preferences.
 */
async function updateUserPreferences(newPreferenceObject) {
	try {
		const currentPrefs = await getCurrentPreferences();
		const updatedUser = await account.updatePrefs({
			...currentPrefs,
			...newPreferenceObject,
		});
		if (updatedUser) {
			return updatedUser;
		}
	} catch (error) {
		console.error("Backend service: 'update user preferences' error:", error);
		throw error;
	}
}

/**
 * Updates the profile image for the current user.
 * @async
 * @function updateProfileImage
 * @param {File} file - The new image file to be uploaded as the user's profile picture.
 * @returns {Promise<string>} A promise that resolves to the URL of the uploaded image.
 */
async function updateProfileImage(file) {
	if (!file) {
		console.error("Backend service: 'update user profile photo' error:");
		throw new Error(
			`Error uploading profile image, '${file}' was not accepted.`
		);
	}

	try {
		const formData = new FormData();
		formData.append('file', file);

		const uniqueFileId = ID.unique();
		const imageUploaded = await storage.createFile(
			storageBucket,
			uniqueFileId,
			file
		);

		if (imageUploaded) {
			return storage.getFileDownload(storageBucket, imageUploaded.$id);
		} else {
			return avatars.getInitials();
		}
	} catch (error) {
		console.error("Backend service: 'update user profile photo' error:", error);
		throw error;
	}
}

export {
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
};


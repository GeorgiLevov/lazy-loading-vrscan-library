import { createContext, useContext, useEffect, useState } from 'react';
import { account, storage, storageBucket, avatars } from '../appwrite';
import { ID } from 'appwrite';
import { newUserEmptyPreferences } from '../user.config';

/**
 * @module UserContext
 * @description Provides a context for user-related data and operations, including authentication and user preferences.
 */

const UserContext = createContext();

/**
 * Custom hook to access the UserContext.
 * @function
 * @name useUser
 * @memberof module:UserContext
 * @returns {Object} The user context value.
 */

export function useUser() {
	return useContext(UserContext);
}

/**
 * Provider component for UserContext.
 * @function
 * @name UserProvider
 * @memberof module:UserContext
 * @param {Object} props - Props for UserProvider.
 * @param {ReactNode} props.children - Children nodes to be rendered.
 * @returns {React.Component} The UserProvider component with children.
 */

export function UserProvider({ children }) {
	const [user, setUser] = useState(null);

	/**
	 * Authenticates a user using email and password.
	 * @function
	 * @name login
	 * @memberof module:UserContext
	 * @param {string} email - User email.
	 * @param {string} password - User password.
	 * @returns {Promise<void>} A promise that resolves when the user is authenticated.
	 */

	async function login(email, password) {
		const loggedIn = await account.createEmailSession(email, password);
		setUser(loggedIn);
	}

	/**
	 * Logs out the current user.
	 * @function
	 * @name logout
	 * @memberof module:UserContext
	 * @returns {Promise<void>} A promise that resolves when the user is logged out.
	 */

	async function logout() {
		await account.deleteSessions();
		setUser(null);
	}

	/**
	 * Registers a new user.
	 * @async
	 * @function
	 * @name signup
	 * @memberof module:UserContext
	 * @param {string} fname - User's first name.
	 * @param {string} lname - User's last name.
	 * @param {string} email - User's email.
	 * @param {string} password - User's password.
	 * @returns {Promise<void>} A promise resolving when the user is registered.
	 */

	async function signup(fname, lname, email, password) {
		const username = `${fname} ${lname}`;
		const userID = ID.unique();
		await account.create(userID, email, password, username);
		await login(email, password);
		await setEmptyPreferences();
	}

	/**
	 * Sets initial empty preferences for a new user.
	 * @async
	 * @function
	 * @name setEmptyPreferences
	 * @memberof module:UserContext
	 * @returns {Promise<void>} A promise that resolves when preferences are set.
	 */

	async function setEmptyPreferences() {
		await account.updatePrefs(newUserEmptyPreferences);
	}

	/**
	 * Updates the user's email address.
	 * @async
	 * @function
	 * @name updateEmail
	 * @memberof module:UserContext
	 * @param {string} newEmail - The new email address.
	 * @param {string} userPassword - The user's current password for verification.
	 * @returns {Promise<void>} A promise that resolves when the email update is successful.
	 */

	async function updateEmail(newEmail, userPassword) {
		await account.updateEmail(newEmail, userPassword);
		await fetchUser();
	}

	/**
	 * Updates the user's name.
	 * @async
	 * @function
	 * @name updateName
	 * @memberof module:UserContext
	 * @param {string} newName - The new name for the user.
	 * @returns {Promise<void>} A promise that resolves when the name update is successful.
	 */

	async function updateName(newName) {
		await account.updateName(newName);
		await fetchUser();
	}

	/**
	 * Updates the user's preferences.
	 * @async
	 * @function
	 * @name updatePreferences
	 * @memberof module:UserContext
	 * @param {Object} newPreferences - The new preferences to be set for the user.
	 * @returns {Promise<void>} A promise that resolves when the preferences are updated.
	 */

	async function updatePreferences(newPreferences) {
		const userPrefs = await account.getPrefs();
		await account.updatePrefs({ ...userPrefs, ...newPreferences });
		await fetchUser();
	}

	/**
	 * Fetches the user's profile image.
	 * @async
	 * @function
	 * @name getProfileImage
	 * @memberof module:UserContext
	 * @returns {Promise<string>} A promise that resolves with the URL of the user's profile image.
	 */

	async function getProfileImage() {
		const userPrefs = await account.getPrefs();
		const photo = userPrefs.photo
			? storage.getFileDownload(storageBucket, userPrefs.photo)
			: avatars.getInitials();

		return photo;
	}

	/**
	 * Updates the user's profile image.
	 * @async
	 * @function
	 * @name updateProfileImage
	 * @memberof module:UserContext
	 * @param {File} file - The new image file to be uploaded.
	 * @returns {Promise<void>} A promise that resolves when the profile image update is successful.
	 */

	async function updateProfileImage(file) {
		if (!file) return;

		try {
			const formData = new FormData();
			formData.append('file', file);

			const uniqueFileId = ID.unique();

			const response = await storage.createFile(
				storageBucket,
				uniqueFileId,
				file
			);

			// prettier-ignore
			const fileURL = `https://cloud.appwrite.io/v1/storage/buckets/${storageBucket}/files/${response.$id}/view?project=${import.meta.env.VITE_API_KEY}`;
			await updatePreferences({ photo_url: fileURL, photo: response.$id });
		} catch (error) {
			console.error('Error uploading profile image:', error);
		}
	}

	/**
	 * Fetches and updates the current user's data in the context.
	 * @async
	 * @function
	 * @name fetchUser
	 * @memberof module:UserContext
	 * @returns {Promise<void>} A promise that resolves when the user's data is fetched and updated.
	 */
	async function fetchUser() {
		try {
			const loggedIn = await account.get();
			const profileImg = await getProfileImage();
			setUser({
				...loggedIn,
				photo: profileImg,
			});
		} catch (err) {
			setUser(null);
		}
	}

	// On mount - the app will check for a user session and will log in the user automatically
	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<UserContext.Provider
			value={{
				user,
				login,
				logout,
				signup,
				update: {
					email: updateEmail,
					name: updateName,
					photo: updateProfileImage,
				},
			}}>
			{children}
		</UserContext.Provider>
	);
}


import { createContext, useContext, useEffect, useState } from 'react';
import { account, storage, storageBucket, avatars } from '../appwrite';
import { ID } from 'appwrite';
import { newUserEmptyPreferences } from '../user.config';

// Creating/Exporting the User context here
const UserContext = createContext();

export function useUser() {
	return useContext(UserContext);
}

// creating Provider component for User context
export function UserProvider({ children }) {
	const [user, setUser] = useState(null);

	async function login(email, password) {
		const loggedIn = await account.createEmailSession(email, password);
		setUser(loggedIn);
	}

	async function logout() {
		await account.deleteSessions();
		setUser(null);
	}

	async function signup(fname, lname, email, password) {
		const username = `${fname} ${lname}`;
		const userID = ID.unique();
		await account.create(userID, email, password, username);
		await login(email, password);
		await setEmptyPreferences();
	}

	async function setEmptyPreferences() {
		await account.updatePrefs(newUserEmptyPreferences);
	}

	async function updateEmail(newEmail, userPassword) {
		await account.updateEmail(newEmail, userPassword);
		await fetchUser();
	}

	async function updateName(newName) {
		await account.updateName(newName);
		await fetchUser();
	}

	async function updatePreferences(newPreferences) {
		const userPrefs = await account.getPrefs();
		await account.updatePrefs({ ...userPrefs, ...newPreferences });
		await fetchUser();
	}

	async function getProfileImage() {
		const userPrefs = await account.getPrefs();
		const photo = userPrefs.photo
			? storage.getFileDownload(storageBucket, userPrefs.photo)
			: avatars.getInitials();

		return photo;
	}

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


import {
	account,
	storage,
	storageBucket,
	avatars,
} from '../../../api/appwrite';
import { ID } from 'appwrite';

async function createSession({ email, password }) {
	try {
		return await account.createEmailSession(email, password);
	} catch (error) {
		console.error("Backend: 'login' error:", error);
		throw error;
	}
}

async function deleteSessions() {
	try {
		await account.deleteSessions();
		setUserLocalStatus(false);
	} catch (error) {
		console.error("Backend service: 'logout' error:", error);
		throw error;
	}
}

async function setEmptyUserPreferences() {
	await account.updatePrefs({
		favorites: [],
		photo: avatars.getInitials(),
	});
}

async function createAccount({ username, email, password }) {
	try {
		const userID = ID.unique();
		return await account.create(userID, email, password, username);
	} catch (error) {
		console.error("Backend service: 'signup' error:", error);
		throw error;
	}
}

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
export function setUserLocalStatus(status) {
	try {
		localStorage.setItem(`vrscan_user_`, JSON.stringify(status));
	} catch (error) {
		console.error('Error setting user local state:', error);
		throw error;
	}
}

async function getCurrentSession() {
	try {
		const session = await account.getSession('current');
		return session;
	} catch (error) {
		console.error('Error fetching user session:', error);
		throw error;
	}
}

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

async function getCurrentPreferences() {
	try {
		return await account.getPrefs();
	} catch (error) {
		console.error('Error fetching user preferences:', error);
		throw error;
	}
}

async function updateUserEmail({ email, password }) {
	try {
		const updatedEmail = await account.updateEmail(email, password);
		if (updatedEmail) return email;
	} catch (error) {
		console.error("Backend service: 'update email' error:", error);
		throw error;
	}
}

async function updateUserName(newName) {
	try {
		const updatedName = await account.updateName(newName);
		if (updatedName) return newName;
	} catch (error) {
		console.error("Backend service: 'update name' error:", error);
		throw error;
	}
}

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

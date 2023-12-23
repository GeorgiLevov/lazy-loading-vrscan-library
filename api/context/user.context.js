import { createContext, useContext, useEffect, useState } from 'react';
import { account } from '../appwrite';
import { ID } from 'appwrite';
import { userPreferences } from '../user.config';

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
		await setPreferences();
	}

	async function setPreferences() {
		await account.updatePrefs(userPreferences);
	}

	async function init() {
		try {
			const loggedIn = await account.get();
			setUser(loggedIn);
		} catch (err) {
			setUser(null);
		}
	}

	// On mount - the app will check for a user session and will log in the user automatically
	useEffect(() => {
		init();
	}, []);

	return (
		<UserContext.Provider value={{ user, login, logout, signup }}>
			{children}
		</UserContext.Provider>
	);
}

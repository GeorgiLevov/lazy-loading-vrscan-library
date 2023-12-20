import { createContext, useContext, useEffect, useState } from 'react';
import { account } from '../appwrite';
import { ID } from 'appwrite';

const UserContext = createContext();

export function useUser() {
	return useContext(UserContext);
}

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

	async function register(email, password) {
		await account.create(ID.unique(), email, password);
		await login(email, password);
	}

	async function init() {
		try {
			const loggedIn = await account.get();
			setUser(loggedIn);
		} catch (err) {
			setUser(null);
		}
	}

	useEffect(() => {
		init();
	}, []);

	return (
		<UserContext.Provider value={{ current: user, login, logout, register }}>
			{children}
		</UserContext.Provider>
	);
}

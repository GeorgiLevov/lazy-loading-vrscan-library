import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { account } from './appwrite';

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

	// async function logout() {
	//   await account.deleteSession("current");
	//   setUser(null);
	// }

	async function signup(email, password) {
		await account.create(email, password);
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
		// eslint-disable-next-line react/jsx-no-constructed-context-values
		<UserContext.Provider value={{ current: user, login, signup }}>
			{children}
		</UserContext.Provider>
	);
}

UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

import { createContext, useContext, useEffect, useState } from 'react';
import { databases } from '../appwrite';
import { ID, Query } from 'appwrite';

export const DATABASE_ID = import.meta.env.VITE_DB_KEY;
export const VRSCANS_COLLECTION_ID = import.meta.env.VITE_CL_VRSCANS_KEY;

const IdeasContext = createContext();

export function useIdeas() {
	return useContext(IdeasContext);
}

export function IdeasProvider({ children }) {
	const [loginVRScans, setLoginVRScans] = useState([]);
	const [vrScans, setVRScans] = useState([]);

	async function get10Random() {
		const response = await databases.listDocuments(
			DATABASE_ID,
			VRSCANS_COLLECTION_ID,
			[Query.orderDesc('$createdAt'), Query.limit(10)]
		);
		setLoginVRScans(response.documents);
	}
	async function init() {
		const response = await databases.listDocuments(
			DATABASE_ID,
			VRSCANS_COLLECTION_ID,
			[Query.orderDesc('$createdAt'), Query.limit(100)]
		);
		setVRScans(response.documents);
	}

	useEffect(() => {
		init();
	}, []);

	return (
		<IdeasContext.Provider value={{ vrScans, loginVRScans, get10Random }}>
			{children}
		</IdeasContext.Provider>
	);
}

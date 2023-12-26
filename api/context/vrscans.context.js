import { createContext, useContext, useEffect, useState } from 'react';
import { databases } from '../appwrite';
import { ID, Query, Permission, Role } from 'appwrite';

export const DATABASE_ID = import.meta.env.VITE_DB_KEY;
export const VRSCANS_COLLECTION_ID = import.meta.env.VITE_CL_VRSCANS_KEY;

const vrScansContext = createContext();

export function useVRScans() {
	return useContext(vrScansContext);
}

export function VRScansProvider({ children }) {
	const [loginVRScans, setLoginVRScans] = useState([]);
	const [vrScans, setVRScans] = useState([]);

	async function get10VRScans() {
		const response = await databases.listDocuments(
			DATABASE_ID,
			VRSCANS_COLLECTION_ID,
			[Query.limit(10)]
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
		get10VRScans();
		init();
	}, []);

	return (
		<vrScansContext.Provider value={{ vrScans, loginVRScans, get10VRScans }}>
			{children}
		</vrScansContext.Provider>
	);
}

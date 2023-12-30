import { createContext, useContext, useEffect, useState } from 'react';
import { databases } from '../appwrite';
import { ID, Query } from 'appwrite';

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

	async function search(searchQuery) {
		const response = await databases.listDocuments(
			DATABASE_ID,
			VRSCANS_COLLECTION_ID,
			[
				Query.search('name', searchQuery),
				Query.orderAsc('id'),
				Query.limit(250),
			]
		);
		setVRScans(response.documents);
	}
	async function init() {
		const response = await databases.listDocuments(
			DATABASE_ID,
			VRSCANS_COLLECTION_ID,
			[Query.limit(50)]
		);
		setVRScans(response.documents);
	}

	useEffect(() => {
		get10VRScans();
	}, []);

	return (
		<vrScansContext.Provider
			value={{ vrScans, search, init, loginVRScans, get10VRScans }}>
			{children}
		</vrScansContext.Provider>
	);
}

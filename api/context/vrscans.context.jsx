import React, { createContext, useContext, useEffect, useState } from 'react';
import { databases } from '../appwrite';
import { Query } from 'appwrite';
import { Stringify } from '../../src/helpers';

export const DATABASE_ID = import.meta.env.VITE_DB_KEY;
export const VRSCANS_COLLECTION_ID = import.meta.env.VITE_CL_VRSCANS_KEY;
export const VRSCANPREVIEWS_COLLECTION_ID = import.meta.env
	.VITE_CL_VRSCANPREVIEWS_KEY;
export const MATERIALS_COLLECTION_ID = import.meta.env.VITE_CL_MATERIALS_KEY;
export const MANUFACTURERS_COLLECTION_ID = import.meta.env
	.VITE_CL_MANUFACTURERS_KEY;
export const INDUSTRIES_COLLECTION_ID = import.meta.env.VITE_CL_INDUSTRIES_KEY;
export const COLORS_COLLECTION_ID = import.meta.env.VITE_CL_COLORS_KEY;
export const TAGS_COLLECTION_ID = import.meta.env.VITE_CL_TAGS_KEY;

/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
// import { createApi } from '@reduxjs/toolkit/query/react'

const vrScansContext = createContext();

export function useVRScans() {
	return useContext(vrScansContext);
}

export function VRScansProvider({ children }) {
	const [loginVRScans, setLoginVRScans] = useState([]);
	const [vrScans, setVRScans] = useState([]);
	const [favoriteScans, setFavoriteScans] = useState([]);
	const [offsetCount, setOffsetCount] = useState(24);
	const [colors, setColors] = useState([]);
	const [tags, setTags] = useState([]);
	const [materials, setMaterials] = useState([]);

	async function get10VRScans() {
		const response = await databases.listDocuments(
			DATABASE_ID,
			VRSCANS_COLLECTION_ID,
			[Query.limit(10)]
		);
		setLoginVRScans(response.documents);
	}

	// async function getVRScanMaterial(material_id) {
	// 	const response = await databases.listDocuments(
	// 		DATABASE_ID,
	// 		MATERIALS_COLLECTION_ID,
	// 		[Query.equal('id', [material_id])]
	// 	);
	// 	return response.documents;
	// }

	async function search(textQuery = '', filtersQuery = [], timesOffset = 0) {
		const offset = offsetCount * timesOffset;
		let tags = [];
		filtersQuery?.forEach((item) => {
			if (item.$collectionId === TAGS_COLLECTION_ID) {
				tags.push(item);
			}
		});
		let colors = [];
		filtersQuery?.forEach((item) => {
			if (item.$collectionId === COLORS_COLLECTION_ID) {
				colors.push(item);
			}
		});
		let materials = [];
		filtersQuery?.forEach((item) => {
			if (item.$collectionId === MATERIALS_COLLECTION_ID) {
				materials.push(
					Stringify({
						id: item.id,
						name: item.name,
					})
				);
			}
		});

		const searchQueryParams = [];

		if (textQuery) searchQueryParams.push(Query.search('name', textQuery));
		if (materials.length)
			searchQueryParams.push(Query.equal('material', materials));
		if (colors.length)
			searchQueryParams.push(
				Query.search('colors', [...colors.map((color) => color.name)].join(' '))
			);
		if (tags.length)
			searchQueryParams.push(
				Query.search('tags', [...tags.map((tag) => tag.name)].join(' '))
			);

		const initialQuery = [
			Query.limit(offsetCount),
			Query.offset(offset),
			Query.orderAsc('id'),
		];
		searchQueryParams.push(...initialQuery);

		const response = await databases.listDocuments(
			DATABASE_ID,
			VRSCANPREVIEWS_COLLECTION_ID,
			searchQueryParams
		);

		setVRScans(
			timesOffset ? [...vrScans, ...response.documents] : response.documents
		);
	}

	async function fetchFilters() {
		const colorsResponse = await databases.listDocuments(
			DATABASE_ID,
			COLORS_COLLECTION_ID,
			[Query.orderAsc('id')]
		);
		setColors(colorsResponse.documents);

		const tagsResponse = await databases.listDocuments(
			DATABASE_ID,
			TAGS_COLLECTION_ID,
			[Query.orderAsc('id')]
		);
		setTags(tagsResponse.documents);

		const materialsResponse = await databases.listDocuments(
			DATABASE_ID,
			MATERIALS_COLLECTION_ID,
			[Query.orderAsc('id')]
		);
		setMaterials(materialsResponse.documents);
	}

	async function getFavorites(userFavorites = []) {
		if (userFavorites.length === 0) {
			setFavoriteScans([]);
			return;
		}

		const response = await databases.listDocuments(
			DATABASE_ID,
			VRSCANPREVIEWS_COLLECTION_ID,
			[Query.equal('id', userFavorites), Query.orderAsc('id')]
		);
		setFavoriteScans(response.documents);
	}

	useEffect(() => {
		search();
		get10VRScans();
		fetchFilters();
	}, []);

	// eslint-disable-next-line react/display-name
	const exportedFunctions = React.memo(() => {
		return {
			vrScans,
			favoriteScans,
			search,
			loginVRScans,
			get10VRScans,
			getFavorites,
			colors,
			tags,
			materials,
		};
	});

	return (
		<vrScansContext.Provider
			value={{
				vrScans,
				favoriteScans,
				search,
				loginVRScans,
				get10VRScans,
				getFavorites,
				colors,
				tags,
				materials,
			}}>
			{children}
		</vrScansContext.Provider>
	);
}

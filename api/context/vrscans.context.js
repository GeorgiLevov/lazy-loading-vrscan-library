import { createContext, useContext, useEffect, useState } from 'react';
import { databases } from '../appwrite';
import { ID, Query } from 'appwrite';

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

	async function getVRScanMaterial(material_id) {
		const response = await databases.listDocuments(
			DATABASE_ID,
			MATERIALS_COLLECTION_ID,
			[Query.equal('id', [material_id])]
		);
		return response.documents;
	}

	async function getVRScanManufacturer(manufacturer_id) {
		const response = await databases.listDocuments(
			DATABASE_ID,
			MANUFACTURERS_COLLECTION_ID,
			[Query.equal('id', [manufacturer_id])]
		);
		return response.documents;
	}

	async function getVRScanIndustries(industry_array) {
		const response = await databases.listDocuments(
			DATABASE_ID,
			INDUSTRIES_COLLECTION_ID,
			[Query.equal('id', industry_array)]
		);
		return response.documents;
	}

	async function getVRScanColors(color_array) {
		const response = await databases.listDocuments(
			DATABASE_ID,
			COLORS_COLLECTION_ID,
			[Query.equal('id', color_array)]
		);
		return response.documents;
	}

	async function getVRScanTags(tag_array) {
		const response = await databases.listDocuments(
			DATABASE_ID,
			TAGS_COLLECTION_ID,
			[Query.equal('id', tag_array)]
		);
		return response.documents;
	}

	async function search(searchQuery, timesOffset = 0) {
		const offset = offsetCount * timesOffset;

		const response = await databases.listDocuments(
			DATABASE_ID,
			VRSCANPREVIEWS_COLLECTION_ID,
			[
				Query.search('name', searchQuery),
				Query.limit(offsetCount),
				Query.offset(offset),
				Query.orderAsc('id'),
			]
		);

		setVRScans(
			timesOffset ? [...vrScans, ...response.documents] : response.documents
		);
	}

	async function getFinalizedVRscans(documents) {
		try {
			const fullDocuments = documents.map(async (document) => {
				const materialType = await getVRScanMaterial(document.material_type_id);
				// prettier-ignore
				const manufacturer = await getVRScanManufacturer(document.manufacturer_id);
				const industries = await getVRScanIndustries(document.industries);
				const colors = await getVRScanColors(document.colors);
				const tags = document.tags.length
					? await getVRScanTags(document.tags)
					: [];

				return {
					...document,
					material: materialType,
					manufacturer: manufacturer,
					industries: industries,
					colors: colors,
					tags: tags,
				};
			});

			const result = await Promise.all(fullDocuments);
			return result;
		} catch (error) {
			console.error(error);
		}
	}

	async function init() {
		const response = await databases.listDocuments(
			DATABASE_ID,
			VRSCANS_COLLECTION_ID,
			[Query.limit(50)]
		);
		setVRScans(response.documents);
	}
	async function fetchFilters() {
		const colorsResponse = await databases.listDocuments(
			DATABASE_ID,
			COLORS_COLLECTION_ID
		);
		setColors(colorsResponse.documents);

		const tagsResponse = await databases.listDocuments(
			DATABASE_ID,
			TAGS_COLLECTION_ID
		);
		setTags(tagsResponse.documents);

		const materialsResponse = await databases.listDocuments(
			DATABASE_ID,
			MATERIALS_COLLECTION_ID
		);
		setMaterials(materialsResponse.documents);
	}

	useEffect(() => {
		fetchFilters();
	}, []);

	useEffect(() => {
		get10VRScans();
	}, []);

	return (
		<vrScansContext.Provider
			value={{
				vrScans,
				search,
				init,
				loginVRScans,
				get10VRScans,
				colors,
				tags,
				materials,
			}}>
			{children}
		</vrScansContext.Provider>
	);
}

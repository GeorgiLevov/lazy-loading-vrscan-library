/**
 * @module Filters
 * @description This React component renders a set of filter boxes for the VRScans catalog.
 * It uses the `CollapsibleFilterBox` component to display individual filter categories such as materials, colors, and tags.
 * The component facilitates the selection and deselection of filters to refine the VRScans search results.
 *
 * @prop {Set} filterSearchValues - A Set containing the identifiers of the currently selected filters.
 * @prop {Function} setFilterSearchValues - Function to update the selected filters.
 */

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CollapsibleFilterBox from './CollapsibleFilterBox';
import { QUERIES, SHADOWS } from '../../constants';

const OuterFiltersWrapper = styled.div`
	position: relative;
	z-index: 500;
	height: 230px;

	@media (${QUERIES.laptopAndDown}) {
		height: auto;
	}
`;

const FiltersWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 20px 0;
	align-items: flex-start;
	position: relative;
	z-index: 500;

	@media (${QUERIES.laptopAndDown}) {
		flex-direction: column;
		align-items: stretch;
	}
`;

function Filters({ filterSearchValues, setFilterSearchValues }) {
	const filters = ['materials', 'colors', 'tags'];

	return (
		<OuterFiltersWrapper>
			<FiltersWrapper>
				{filters.map((filter, index) => {
					return (
						<CollapsibleFilterBox
							key={`${filter}-${index}`}
							filterType={filter}
							selectedFilters={filterSearchValues}
							setSelectedFilters={setFilterSearchValues}
						/>
					);
				})}
			</FiltersWrapper>
		</OuterFiltersWrapper>
	);
}
export default Filters;


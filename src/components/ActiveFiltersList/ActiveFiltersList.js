import React, { useEffect, useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import Divider from '../Divider';

const ActiveFiltersList = ({
	textSetValue,
	setTextSetValue,
	filterSearchValues,
	setFilterSearchValues,
}) => {
	const [activeFilters, setActiveFilters] = useState([]);

	const updateFilterState = (selection) => {
		if (selection.id === 'text-filter') {
			setTextSetValue('');
		} else {
			const newButtonFilters = activeFilters.filter(
				(selectedFilter) =>
					selectedFilter.id !== selectedFilter.id &&
					selectedFilter.id !== 'text-filter'
			);
			setFilterSearchValues(new Set(newButtonFilters));
		}
	};

	// When the Text Search Value changes - we need to handle how the active filter list will be updated
	useEffect(() => {
		const textFilter = { id: 'text-filter', name: textSetValue };
		// aremove text filter from activeFilters
		if (!textFilter.name) {
			// This will be triggered by how we handle the changing of textSetValue/FilterSearchValue states
			setActiveFilters((prevFilters) => {
				return prevFilters.filter(
					(selectedFilter) => selectedFilter.id !== textFilter.id
				);
			});
		}
		// add or replace text filter from activeFilters
		else {
			// This will be triggered by how we handle the changing of textSetValue/FilterSearchValue states
			setActiveFilters((prevFilters) => {
				const allOtherFilters = prevFilters.filter(
					(selectedFilter) => selectedFilter.id !== textFilter.id
				);
				console.log('allOtherFilters:', allOtherFilters);
				console.log('textFilter:', textFilter);
				console.log('activeFilters:', [...allOtherFilters, textFilter]);

				return [...allOtherFilters, textFilter];
			});
		}
	}, [textSetValue]);

	// When the Button Filters change outside of this component - need to handle adding, updating and removing filter
	useEffect(() => {
		let textFilterPosition;
		const textFilter = activeFilters.filter((filter, index) => {
			if (filter.id === 'text-filter') {
				textFilterPosition = index;
				return filter;
			}
		})[0];

		const newFilters = Array.from(filterSearchValues);

		if (typeof textFilterPosition !== 'undefined') {
			console.log(textFilterPosition);
			console.log('textFilter:', textFilter);
			console.log('newFilters:', newFilters);
			console.log(
				'activeFilters:',
				newFilters.splice(textFilterPosition, 0, textFilter)
			);
			setActiveFilters(newFilters.splice(textFilterPosition, 0, textFilter));
		} else {
			setActiveFilters(newFilters);
		}
	}, [filterSearchValues]);

	return (
		<>
			{activeFilters.length > 0 && (
				<div>
					{activeFilters.map((filter) => {
						return <div key={filter.id}>{filter.name}</div>;
					})}
				</div>
			)}
			<Divider />
		</>
	);
};

export default ActiveFiltersList;

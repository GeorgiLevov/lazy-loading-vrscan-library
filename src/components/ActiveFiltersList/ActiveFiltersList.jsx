/**
 * @module ActiveFiltersList
 * @description This React component displays a list of active filters applied by the user. It provides functionality
 * to view and remove these filters. The component handles both text and button filters, allowing users to dynamically
 * manage the filter criteria.
 *
 * @requires React - React library for building UI components.
 * @requires styled-components - Library for styling React components.
 * @requires Divider - Component to render a visual divider in the UI.
 * @requires Button - Custom button component.
 * @requires react-feather - Library for Feather icons in React.
 * @requires COLORS, QUERIES, SPACING - Constants for styling.
 * @requires insertItemAtIndex - Utility function for array manipulation.
 *
 * @prop {Function} textSetValue - Function to set the value of the text filter.
 * @prop {Function} setTextSetValue - Function to update the text filter value.
 * @prop {Set} filterSearchValues - Set containing the active filter search values.
 * @prop {Function} setFilterSearchValues - Function to update the filter search values.
 */

import { useEffect, useState } from 'react';
import Divider from '../Divider';
import { insertItemAtIndex } from '../../utils';
import styled from 'styled-components';
import { COLORS, QUERIES, SPACING } from '../../constants';
import Button from '../Button/Button';
import { X } from 'react-feather';

const ActiveFiltersList = ({
	textSetValue,
	setTextSetValue,
	filterSearchValues,
	setFilterSearchValues,
}) => {
	const [activeFilters, setActiveFilters] = useState([]);

	/**
	 * Updates the state of active filters when a filter is removed.
	 * @function updateFilterState
	 * @param {Object} selection - The filter object to be updated.
	 */
	const updateFilterState = (selection) => {
		if (selection.id === 'text-filter') {
			const newFilters = activeFilters.filter(
				(selectedFilter) => selectedFilter.id !== 'text-filter'
			);
			setActiveFilters(newFilters);
			setTextSetValue('');
		} else {
			const newButtonFilters = activeFilters.filter(
				(selectedFilter) =>
					selectedFilter.$id !== selection.$id &&
					selectedFilter.id !== 'text-filter'
			);
			setFilterSearchValues(new Set(newButtonFilters));
		}
	};

	/**
	 * useEffect hook to handle updates in the text filter value.
	 * Adds or removes the text filter from the active filters list based on its presence.
	 */
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
				return [...allOtherFilters, textFilter];
			});
		}
	}, [textSetValue]);

	/**
	 * useEffect hook to handle changes in the button filter values.
	 * Updates the active filters list based on the current set of selected filters.
	 */
	useEffect(() => {
		let textFilterPosition;
		// get the filter object from here, not the array with 1 element, also get the index position of the element
		const textFilter = activeFilters.filter((filter, index) => {
			if (filter.id === 'text-filter') {
				textFilterPosition = index;
				return filter;
			}
		})[0];

		const newFilters = Array.from(filterSearchValues);

		if (typeof textFilterPosition !== 'undefined') {
			// when we remove a filter that is smaller than the textFilter - we want to move the text filter 1 position back as well
			let removedFilterPosition;
			// const removedFilter = activeFilters.filter((element, index) => {
			// 	if (!filterSearchValues.has(element) && element.id !== 'text-filter') {
			// 		removedFilterPosition = index;
			// 	}
			// });
			if (removedFilterPosition < textFilterPosition) {
				textFilterPosition = textFilterPosition - 1;
			}

			const combinedArray = insertItemAtIndex(
				newFilters,
				textFilterPosition,
				textFilter
			);
			setActiveFilters(combinedArray);
		} else {
			setActiveFilters(newFilters);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterSearchValues]);

	return (
		<>
			<StyledFiltersList>
				<StyledFilterName>
					{activeFilters.length > 0
						? 'Applied Filters:'
						: 'You have no applied filters.'}
				</StyledFilterName>
				{activeFilters.length > 0 &&
					activeFilters.map((filter) => {
						return (
							<Button
								key={`${filter.id}-${filter.name.charAt(0)}${filter.name.charAt(
									1
								)}`}
								variant="filter"
								size="medium"
								icon={X}
								onClick={() => updateFilterState(filter)}>
								<StyledFilterName>{filter.name}</StyledFilterName>
							</Button>
						);
					})}
			</StyledFiltersList>
			<Divider />
		</>
	);
};

const StyledFiltersList = styled.div`
	font-family: 'Helvetica', sans-serif;
	font-weight: 300;

	width: 100%;
	min-height: 50px;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	padding-top: ${SPACING.mega};

	& > * {
		min-width: ${SPACING.mega};
		margin-bottom: ${SPACING.micro};
		margin-right: ${SPACING.micro};
	}

	& > * > svg {
		color: ${COLORS.red};
	}

	@media (${QUERIES.laptopAndDown}) {
		padding-top: revert;
	}
`;

const StyledFilterName = styled.span`
	color: ${COLORS.black};
`;

export default ActiveFiltersList;

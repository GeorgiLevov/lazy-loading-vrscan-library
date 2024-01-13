import React, { useEffect, useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
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
				return [...allOtherFilters, textFilter];
			});
		}
	}, [textSetValue]);

	// When the Button Filters change outside of this component - need to handle adding, updating and removing filter
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
			const removedFilter = activeFilters.filter((element, index) => {
				if (!filterSearchValues.has(element) && element.id !== 'text-filter') {
					removedFilterPosition = index;
				}
			});
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
	/* min-height: 90px; */
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

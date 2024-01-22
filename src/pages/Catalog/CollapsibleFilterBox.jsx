/**
 * @module CollapsibleFilterBox
 * @description This React component renders a filter box for VRScans, which can be expanded or collapsed.
 * It supports filters for materials, colors, and tags. Users can select or deselect filters to refine their scan results.
 * The component uses a combination of local state, context, and props to manage its behavior and UI.
 *
 * @prop {string} filterType - The type of filter to display (materials, colors, or tags).
 * @prop {Set} selectedFilters - A Set containing the currently selected filters' identifiers.
 * @prop {Function} setSelectedFilters - Function to update the selected filters.
 */

import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { COLORS, SHADOWS, SPACING } from '../../constants';
import Button from '../../components/Button/Button';
import { ArrowDownRight } from 'react-feather';
import { ArrowUpRight } from 'react-feather';
import { useVRScans } from '../../../api/context/vrscans.context';
import Loader from '../../components/Loader';
import { capitalize } from '../../utils';

const FilterBox = styled.div`
	flex-basis: 32%;
	margin-bottom: ${SPACING.small};
	padding: ${SPACING.small};
	border-radius: ${SPACING.small};
	transition: box-shadow 0.1s ease-in-out;

	background: ${COLORS.gray.light};

	&:hover {
		box-shadow: ${SHADOWS.low};
	}
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Title = styled.h3`
	margin: 0;
	color: black;
`;

const FiltersContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-top: 10px;
	overflow: hidden;
	transition: all 0.5s ease-in-out;

	${({ $isExpanded }) =>
		$isExpanded ? 'max-height: 1000px;' : 'max-height:140px;'}

	> button {
		margin: 4px;
	}
`;

const CollapsibleFilterBox = ({
	filterType,
	selectedFilters,
	setSelectedFilters,
}) => {
	/**
	 * Validates the filterType prop to ensure it is one of the accepted values.
	 * Throws an error if the filterType is unrecognized.
	 */
	if (!['materials', 'colors', 'tags'].includes(filterType)) {
		throw new Error(`Unrecognized Filter '${filterType}'!
        Please use a proper VRScan Filter Type: colors, materials, tags!`);
	}

	const { [filterType]: filters } = useVRScans();
	const [isExpanded, setIsExpanded] = useState(false);

	const filterBoxRef = useRef(null);

	/**
	 * Toggles the selection of a filter.
	 * Adds the filter to the selected filters if it's not already selected, otherwise removes it.
	 * @function
	 * @name toggleFilter
	 * @param {string} filterId - The unique identifier of the filter to toggle.
	 * @memberof module:CollapsibleFilterBox
	 */
	const toggleFilter = (filterId) => {
		setSelectedFilters((prevSelected) => {
			const newSelected = new Set(prevSelected);
			if (newSelected.has(filterId)) {
				newSelected.delete(filterId);
			} else {
				newSelected.add(filterId);
			}
			return newSelected;
		});
	};

	/**
	 * Handles click events outside the component to automatically collapse the filter box.
	 * @function
	 * @name handleClickOutside
	 * @param {Event} event - The DOM event triggered by a click.
	 * @memberof module:CollapsibleFilterBox
	 */
	const handleClickOutside = (event) => {
		if (filterBoxRef.current && !filterBoxRef.current.contains(event.target)) {
			setIsExpanded(false);
		}
	};

	/**
	 * Sets up an event listener for handling outside clicks to collapse the filter box.
	 * This effect sets up the event listener on component mount and cleans it up on unmount.
	 * @memberof module:CollapsibleFilterBox
	 */
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<FilterBox ref={filterBoxRef}>
			<Header>
				<Title>{capitalize(filterType)}</Title>
				<Button
					variant="base"
					icon={isExpanded ? ArrowUpRight : ArrowDownRight}
					iconfirst={false}
					onClick={() => setIsExpanded(!isExpanded)}>
					{isExpanded ? `Show Less` : 'View All'}
				</Button>
			</Header>
			<Loader isLoading={!filters.length} variant="vrscan">
				<FiltersContainer $isExpanded={isExpanded}>
					{filters.map((filter) => {
						const isSelected = selectedFilters.has(filter);
						return filterType === 'colors' ? (
							<Button
								variant="filter"
								size="medium"
								key={`${filterType}-${filter.id}`}
								style={{ backgroundColor: filter.hex, padding: `16px 0px` }}
								selected={isSelected}
								onClick={() => toggleFilter(filter)}
							/>
						) : (
							<Button
								variant="filter"
								size="medium"
								key={`${filterType}-${filter.id}`}
								selected={isSelected}
								onClick={() => toggleFilter(filter)}>
								{filter.name}
							</Button>
						);
					})}
				</FiltersContainer>
			</Loader>
		</FilterBox>
	);
};

export default CollapsibleFilterBox;

CollapsibleFilterBox.propTypes = {
	filterType: PropTypes.string,
	selectedFilters: PropTypes.object,
	setSelectedFilters: PropTypes.func,
};


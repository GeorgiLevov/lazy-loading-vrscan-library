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
	if (!['materials', 'colors', 'tags'].includes(filterType)) {
		throw new Error(`Unrecognized Filter '${filterType}'!
        Please use a proper VRScan Filter Type: colors, materials, tags!`);
	}

	const { [filterType]: filters } = useVRScans();
	const [isExpanded, setIsExpanded] = useState(false);

	const filterBoxRef = useRef(null);

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

	const handleClickOutside = (event) => {
		if (filterBoxRef.current && !filterBoxRef.current.contains(event.target)) {
			setIsExpanded(false);
		}
	};

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

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import filtersData from './Filters';
import Button from '../../components/Button/Button';

const FilterBox = styled.div`
	flex-basis: 30%;
	margin: 10px;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
	min-height: 180px;
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
	transition: max-height 0.3s ease-in-out;

	${({ $isExpanded }) =>
		$isExpanded ? 'max-height: 1000px;' : 'max-height: 160px;'}

	> button {
		flex: 1 0 30%;
		margin: 5px;
		max-width: calc(33.33% - 10px);
	}
`;

const FilterButton = styled.button`
	padding: 12px auto;
	min-height: 40px;
	border: ${(props) =>
		props.selected ? '2px solid darkblue' : '1px solid #ccc'};
	box-sizing: border-box;
	cursor: pointer;
	background-color: ${(props) => (props.selected ? '#f0f0f0' : '#f0f0f0')};
	color: black;
	transition: background-color 0.3s ease;
	height: 40px;
	margin: 1px;
	font-size: 15px;
	height: auto;

	&:hover {
		opacity: 0.8;
	}

	&:focus {
		outline: none;
		border: ${(props) =>
			props.selected ? '2px solid darkblue' : '1px solid #ccc'};
	}
`;

const ColorButton = styled(FilterButton)`
	background-color: ${(props) =>
		props.selected ? '#ADD8E6' : props.color || '#fff'};
`;

const CollapsibleFilterBox = ({ title, filters, isColor }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [selectedFilters, setSelectedFilters] = useState(new Set());

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

	const displayedFilters = isExpanded ? filters : filters.slice(0, 6);

	return (
		<FilterBox>
			<Header>
				<Title>{title}</Title>
				<Button variant="secondary" onClick={() => setIsExpanded(!isExpanded)}>
					{isExpanded ? 'Show Less' : 'View All'}
				</Button>
			</Header>
			<FiltersContainer $isExpanded={isExpanded}>
				{displayedFilters.map((filter) => {
					const isSelected = selectedFilters.has(filter.id);
					return isColor ? (
						<ColorButton
							key={filter.id}
							color={filter.name}
							selected={isSelected}
							onClick={() => toggleFilter(filter.id)}
						/>
					) : (
						<FilterButton
							key={filter.id}
							selected={isSelected}
							onClick={() => toggleFilter(filter.id)}>
							{filter.name}
						</FilterButton>
					);
				})}
			</FiltersContainer>
		</FilterBox>
	);
};

export default CollapsibleFilterBox;


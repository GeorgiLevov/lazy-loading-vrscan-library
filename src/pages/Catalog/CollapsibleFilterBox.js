import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { COLORS, SPACING } from '../../constants';
import Button from '../../components/Button/Button';
import { ArrowDownRight } from 'react-feather';
import { ArrowUpRight } from 'react-feather';

const FilterBox = styled.div`
	flex-basis: 32%;
	margin-bottom: 15px;
	padding: ${SPACING.small};
	border-radius: 15px;
	min-height: 180px;
	background: ${COLORS.gray.light};
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
		$isExpanded ? 'max-height: 1000px;' : 'max-height: 160px;'}

	> button {
		flex: 1 0 30%;
		margin: 5px;
		max-width: calc(33.33% - 10px);
	}
`;

const FilterButton = styled.button`
	font-family: 'Helvetica', sans-serif !important;
	font-weight: 300;

	min-height: 40px;
	border: ${(props) =>
		props.selected ? `2px solid ${COLORS.black}` : `1px solid ${COLORS.gray}`};
	box-sizing: border-box;
	cursor: pointer;
	background-color: ${COLORS.white};
	color: black;
	transition: background-color 0.3s ease;
	box-shadow: ${(props) =>
		props.selected
			? `0 0 0 2px ${COLORS.gray.light} inset;`
			: `1px solid ${COLORS.gray}`};

	box-sizing: border-box;
	overflow: hidden;
	font-size: 15px;
	height: auto;

	&:hover {
		opacity: 0.8;
	}

	&:focus {
		outline: none;
		border: ${(props) =>
			props.selected
				? `2px solid ${COLORS.black}`
				: `1px solid ${COLORS.gray}`};
	}
`;

const ColorButton = styled(FilterButton)`
	background-color: ${(props) => props.color};
	border: ${(props) =>
		props.selected ? `2px solid ${COLORS.black}` : `px solid ${COLORS.gray}`};
`;

const CollapsibleFilterBox = ({ title, filters, isColor }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [selectedFilters, setSelectedFilters] = useState(new Set());
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

	const displayedFilters = isExpanded ? filters : filters.slice(0, 6);

	return (
		<FilterBox ref={filterBoxRef}>
			<Header>
				<Title>{title}</Title>
				<Button
					variant="base"
					icon={isExpanded ? ArrowUpRight : ArrowDownRight}
					iconfirst={false}
					onClick={() => setIsExpanded(!isExpanded)}>
					{isExpanded ? `Show Less ` : 'View All'}
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


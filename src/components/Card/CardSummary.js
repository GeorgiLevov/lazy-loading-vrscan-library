import React from 'react';
import { FONTS, SPACING, COLORS } from '../../constants';
import styled from 'styled-components';
import { Objectify } from '../../utils';

const CardSummary = ({ material, colors, tags }) => {
	const materialObject = Objectify(material);
	const materialItem = {
		...materialObject,
		id: `material-${materialObject.id}`,
	};

	const colorItems = colors.map((color) => {
		const colorObject = Objectify(color);
		return {
			...colorObject,
			id: `color-${colorObject.id}`,
		};
	});

	const tagItems = tags.length
		? tags.map((tag) => {
				const tagObject = Objectify(tag);
				return {
					...tagObject,
					id: `tag-${tagObject.id}`,
				};
			})
		: [];

	const allItems = [materialItem, ...colorItems, ...tagItems];

	return (
		<StyledSummary>
			{allItems.map((item) => {
				return <StyledSummaryItem key={item.id}>{item.name}</StyledSummaryItem>;
			})}
		</StyledSummary>
	);
};

const StyledSummary = styled.ol`
	list-style-type: none;
	width: 100%;
	font-family: 'Helvetica', sans-serif;
	font-weight: 300;
	display: flex;
	min-height: ${FONTS.heading.normal};
	margin: 0;
	margin-bottom: ${SPACING.small} !important;

	& > * {
		margin-right: ${SPACING.micro};
	}
`;

const StyledSummaryItem = styled.li`
	display: inline;
	font-size: ${FONTS.text.label};
	border: 1px solid ${COLORS.transparent};
	border-radius: 16px;
	padding: 0 ${SPACING.micro};

	color: ${COLORS.black};
	background: ${COLORS.gray.tag};
`;

export default CardSummary;

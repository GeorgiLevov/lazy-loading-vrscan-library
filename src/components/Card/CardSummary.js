import React from 'react';
import { FONTS, SPACING, COLORS } from '../../constants';
import styled from 'styled-components';
import { Objectify } from '../../helpers';

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

	// We can try adding this animation for the summary items
	// https://codesandbox.io/p/sandbox/framer-motion-scroll-velocity-forked-kwnqys?file=%2Fsrc%2FApp.tsx%3A71%2C33

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

	white-space: nowrap;

	&:last-of-type {
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

export default CardSummary;

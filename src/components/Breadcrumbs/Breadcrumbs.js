import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { capitalize } from '../../utils';
import { COLORS } from '../../constants';

// WAI-ARIA guidelines for Breadcrumbs
// https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/
// https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/examples/breadcrumb/
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current

function Breadcrumbs({ children }) {
	const location = useLocation();

	return (
		<nav aria-label="Breadcrumb">
			<BreadcrumbList>
				{/* generating path for each breadcrumb based on react-router locaiton */}
				{location.pathname.split('/').map((path, index, array) => {
					let href = array.slice(0, index + 1).join('/');
					href = href === '' ? '/' : href;
					return (
						<Crumb
							key={href}
							target={href}
							isCurrentPage={location.pathname === href}>
							{path === '' ? 'Home' : capitalize(path)}
						</Crumb>
					);
				})}
			</BreadcrumbList>
		</nav>
	);
}

const BreadcrumbList = styled.ol`
	padding: 20px 0;
	margin: 0;
	list-style-type: none;
`;

export const Crumb = ({ target = '/', isCurrentPage = false, children }) => {
	return (
		<CrumbWrapper>
			<CrumbLink to={target} aria-current={isCurrentPage ? 'page' : null}>
				{children}
			</CrumbLink>
		</CrumbWrapper>
	);
};

const CrumbWrapper = styled.li`
	display: inline;
	--spacing: 12px;
	color: hsl(${COLORS.gray[500]});
	font-weight: 300;
	color: #838282;

	&:last-of-type {
		color: hsl(${COLORS.white});
	}

	&:not(:first-of-type) {
		margin-left: var(--spacing);
		color: #000;

		&::before {
			content: '';
			border-right: 1px solid;
			border-right-width: thin;
			height: 0.75rem;
			opacity: 0.25;
			display: inline-block;
			margin-right: var(--spacing);
			transform: rotate(20deg);
		}
	}
`;

const CrumbLink = styled(NavLink)`
	color: inherit;
	text-decoration: none;

	&:hover {
		text-decoration: none;
		color: ${COLORS.black};
	}
`;

export default Breadcrumbs;

Breadcrumbs.propTypes = {
	children: PropTypes.array,
};

Breadcrumbs.defaultProps = {
	children: PropTypes.function,
};

Crumb.propTypes = {
	target: PropTypes.string,
	isCurrentPage: PropTypes.bool,
	children: PropTypes.string.isRequired,
};

Crumb.defaultProps = {
	target: '/',
	isCurrentPage: false,
};


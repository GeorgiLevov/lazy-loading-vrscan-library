/**
 * @module Button
 * @description This component renders a customizable button that adapts its appearance based on provided props.
 * It supports multiple variants, sizes, and the ability to include an icon. The button can be rendered as a
 * standard button or as a link (using react-router's Link component) based on the provided props.
 * @prop {string} [id] - Optional ID for the button.
 * @prop {string} variant - The variant of the button, which defines its styling.
 * @prop {string} [size='medium'] - The size of the button, influencing padding and font size.
 * @prop {object} [icon] - Icon component to be rendered inside the button.
 * @prop {boolean} [iconfirst] - Determines if the icon is positioned before the text.
 * @prop {string} [href] - URL for the button link. If provided, the button is rendered as a Link.
 * @prop {ReactNode} children - The content inside the button.
 * @prop {function} [onClick] - The function to be executed on button click.
 * @prop {boolean} [selected=false] - Indicates if the button is selected (for toggleable buttons).
 * @prop {object} [style] - Custom style object to override default styles.
 */

import styled from 'styled-components';
import { COLORS, QUERIES, FONTS, SPACING } from '../../constants';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ButtonBase = styled.button`
	margin: 0;
	border: 0;
	position: relative;
	width: max-content;
	background: transparent;
	font-family: 'Helvetica', sans-serif;
	font-weight: 300;
	overflow: hidden;
	cursor: pointer;
	text-decoration: none;
	touch-action: manipulation;
	text-align: left;
	color: inherit;

	font-size: var(--fontSize);
	padding: var(--padding);
	border-radius: var(--borderRadius);

	&:focus {
		outline-offset: 2px;
	}

	&:focus:not(:focus-visible) {
		outline: none;
	}

	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: ${(p) => (p.$iconfirst ? 'row' : 'row-reverse')};

	& > svg {
		margin-right: ${(p) => (p.$iconfirst ? SPACING.micro : '0px')};
		margin-left: ${(p) => (p.$iconfirst ? '0px' : SPACING.micro)};
		min-width: 24px;

		@media ${QUERIES.tabletAndDown} {
			margin: 0;
		}
	}
`;

const PrimaryButton = styled(ButtonBase)`
	background-color: ${COLORS.primaryBlue};
	color: ${COLORS.white};
	letter-spacing: 0.2px;
	z-index: 1;
	position: relative;

	&:hover {
		color: ${COLORS.white};
	}

	/* Effect on Hover styles */
	&:after {
		content: '';
		background: ${COLORS.black};
		position: absolute;
		z-index: -1;
		left: -20%;
		right: -20%;
		top: 0;
		bottom: 0;
		transform: skewX(-45deg) scale(0, 1);
		transition: all 0.5s;
		border: 0;
	}

	&:hover:after {
		transform: skewX(-45deg) scale(1, 1);
		-webkit-transition: all 0.5s;
		transition: all 0.5s;
	}
`;

const SecondaryButton = styled(ButtonBase)`
	color: ${COLORS.primaryBlue};
	transition: color 0.2s ease-in-out;
	&:hover {
		color: ${COLORS.primaryBlueHighlight};
	}
`;

const UnderlineButton = styled(ButtonBase)`
	overflow: visible;
	transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
	transition-duration: 400ms;
	transition-property: color;

	&:focus,
	&:hover {
		color: ${COLORS.black};
	}

	&:focus:after,
	&:hover:after {
		width: 100%;
		left: 0%;
	}

	&:after {
		content: '';
		pointer-events: none;
		bottom: -8px;
		left: 50%;
		position: absolute;
		width: 0%;
		height: 1px;
		background-color: #000;
		transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
		transition-duration: 400ms;
		transition-property: width, left;
	}
`;

const FilterButton = styled(ButtonBase)`
	min-height: 40px;
	min-width: calc(33% - 7px);
	padding: 8px 11px;
	background-color: ${COLORS.white};
	border: var(--border);
	box-shadow: var(--boxShadow);
	color: black;
	font-size: ${FONTS.text.normal};
	transition: background-color 0.3s ease;
	white-space: nowrap;

	@media (${QUERIES.phoneAndDown}) {
		max-width: revert;
		flex: 1 0 30%;
	}

	&:hover {
		opacity: 0.8;
	}

	&:focus {
		outline: none;
		border: var(--border);
	}
`;

const COMPONENTS = {
	base: ButtonBase,
	primary: PrimaryButton,
	secondary: SecondaryButton,
	underline: UnderlineButton,
	filter: FilterButton,
};

const SIZES = {
	small: {
		'--borderRadius': 24 + 'px',
		'--fontSize': `${FONTS.text.small}`,
		'--padding': '4px 10px',
	},
	medium: {
		'--borderRadius': 30 + 'px',
		'--fontSize': `${FONTS.text.normal}`,
		'--padding': '12px 20px',
	},
	large: {
		'--borderRadius': 32 + 'px',
		'--fontSize': `${FONTS.text.normal}`,
		'--padding': '16px 28px',
	},
	xl: {
		'--borderRadius': 32 + 'px',
		'--fontSize': `${FONTS.heading.small}`,
		'--padding': '12px 48px',
	},
};

const BORDER = {
	true: {
		'--border': `2px solid ${COLORS.black}`,
		'--boxShadow': `0 0 0 2px ${COLORS.gray.light} inset`,
	},
	false: {
		'--border': `1px solid ${COLORS.transparent}`,
		'--boxShadow': `1px solid ${COLORS.transparent}`,
	},
};

const Button = ({
	id,
	variant,
	size = 'medium',
	icon: Icon,
	iconfirst,
	href,
	children,
	onClick,
	selected = false,
	style,
}) => {
	const sizeStyles = SIZES[size];
	const isSelectedStyles = BORDER[selected.toString()];

	if (!variant) throw new Error(`Unrecognized Button variant: ${variant}`);

	const StyledComponent = COMPONENTS[variant];

	// Dynamic tag setup based on: https://styled-components.com/docs/api#as-polymorphic-prop
	return (
		<StyledComponent
			id={id}
			data-testid="button"
			to={href}
			as={href ? Link : 'button'}
			$iconfirst={iconfirst}
			style={{ ...sizeStyles, ...isSelectedStyles, ...style }}
			onClick={onClick ? () => onClick() : () => false}>
			{Icon && <Icon strokeWidth={1.1} />}
			{children}
		</StyledComponent>
	);
};

export default Button;

Button.propTypes = {
	id: PropTypes.string,
	variant: PropTypes.string.isRequired,
	size: PropTypes.string,
	icon: PropTypes.object,
	iconfirst: PropTypes.bool,
	href: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	onClick: PropTypes.func,
	selected: PropTypes.bool,
	style: PropTypes.object,
};


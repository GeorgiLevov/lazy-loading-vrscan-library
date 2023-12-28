import React from 'react';
import styled from 'styled-components';
import { COLORS, QUERIES, FONTS, SPACING } from '../../constants';
import { Link } from 'react-router-dom';

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

const Button = ({
	variant,
	size,
	icon: Icon,
	iconfirst,
	href,
	children,
	onClick,
}) => {
	const styles = SIZES[size];

	let StyledComponent;
	if (variant === 'base') {
		StyledComponent = ButtonBase;
	} else if (variant === 'primary') {
		StyledComponent = PrimaryButton;
	} else if (variant === 'secondary') {
		StyledComponent = SecondaryButton;
	} else if (variant === 'underline') {
		StyledComponent = UnderlineButton;
	} else {
		throw new Error(`Unrecognized Button variant: ${variant}`);
	}

	// Dynamic tag setup based on: https://styled-components.com/docs/api#as-polymorphic-prop
	return (
		<StyledComponent
			to={href}
			as={href ? Link : 'button'}
			$iconfirst={iconfirst}
			style={styles}
			onClick={() => onClick()}>
			{Icon && <Icon strokeWidth={1.1} />}
			{children}
		</StyledComponent>
	);
};

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
		margin-right: ${(p) => (p.$iconfirst ? SPACING.xs : '0px')};
		margin-left: ${(p) => (p.$iconfirst ? '0px' : SPACING.xs)};
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
		color: ${COLORS.gray.text};
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

export default Button;

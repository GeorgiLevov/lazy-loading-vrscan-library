import React from 'react';
import styled from 'styled-components';
import { COLORS, QUERIES, SHADOWS, FONTS } from '../../constants';

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
	children,
	onClick = () => {
		return;
	},
}) => {
	const styles = SIZES[size];

	let StyledComponent;
	if (variant === 'base') {
		StyledComponent = ButtonBase;
	} else if (variant === 'primary') {
		StyledComponent = PrimaryButton;
	} else if (variant === 'secondary') {
		StyledComponent = SecondaryButton;
	} else if (variant === 'icon') {
		StyledComponent = IconButton;
	} else {
		throw new Error(`Unrecognized Button variant: ${variant}`);
	}

	return (
		<StyledComponent role="button" style={styles} onClick={() => onClick()}>
			{children}
		</StyledComponent>
	);
};

const ButtonBase = styled.button`
	margin: 0;
	padding: 0;
	background: transparent;
	font-family: 'Helvetica', sans-serif;
	font-weight: 300;
	border: 0;
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
`;

const PrimaryButton = styled(ButtonBase)`
	background-color: ${COLORS.primaryBlue};
	color: ${COLORS.white};
	z-index: 1;
	position: relative;

	&:hover {
	}

	&:after {
		content: '';
		background: #000;
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

	svg {
		margin: 0 0 0 8px;
	}
`;

const SecondaryButton = styled(ButtonBase)`
	color: ${COLORS.primaryBlue};
`;

const IconButton = styled(PrimaryButton)`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export default Button;

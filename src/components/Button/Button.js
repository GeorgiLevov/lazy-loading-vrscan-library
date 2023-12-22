import React from 'react';
import styled from 'styled-components';
import { COLORS, QUERIES, SHADOWS } from '../../constants';

const SIZES = {
	small: {
		'--borderRadius': 24 + 'px',
		'--fontSize': 16 / 16 + 'rem',
		'--padding': '4px 12px',
	},
	medium: {
		'--borderRadius': 24 + 'px',
		'--fontSize': 20 / 16 + 'rem',
		'--padding': '6px 20px',
	},
	large: {
		'--borderRadius': 32 + 'px',
		'--fontSize': 24 / 16 + 'rem',
		'--padding': '10px 36px',
	},
	xl: {
		'--borderRadius': 32 + 'px',
		'--fontSize': 30 / 16 + 'rem',
		'--padding': '12px 60px',
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
	cursor: pointer;
	text-decoration: none;
	touch-action: manipulation;
	text-align: left;
	color: inherit;

	font-size: var(--fontSize);
	padding: var(--padding);
	border: 2px solid transparent;
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

	&:hover {
		background-color: ${COLORS.gray.dark};
	}
`;

const SecondaryButton = styled(ButtonBase)``;

const IconButton = styled(ButtonBase)``;

export default Button;

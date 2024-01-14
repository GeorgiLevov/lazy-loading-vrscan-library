import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';

import { X } from 'react-feather';
import { COLORS, SPACING } from '../../constants';
import Button from '../Button';

// Would be nice if we could use something like: https://reach.tech/dialog/

function Modal({ closeDialog, title, children }) {
	useEffect(() => {
		const handleEscapeKeyboardKey = (event) => {
			if (event.code === 'Escape') closeDialog();
		};

		window.addEventListener('keydown', handleEscapeKeyboardKey);

		// cleanup that listener
		return () => {
			window.removeEventListener('keydown', handleEscapeKeyboardKey);
		};
	}, [closeDialog]);

	return (
		// FocusLock will make sure we can't tab through page when a modal is open
		// FocusLock will also return focus so we don't have to worry about forwarding refs
		<FocusLock returnFocus={true}>
			{/* RemoveScroll will not allow the page to be scrolled while modal is open */}
			<RemoveScroll>
				<Wrapper>
					{/* Backdrop should not a button because we don't want it to be focusable */}
					<Backdrop onClick={closeDialog} />
					<Dialog role="dialog" aria-modal="true" aria-label={title}>
						<CloseButton onClick={closeDialog} aria-label="Close Dialog">
							<X strokeWidth={2} />
						</CloseButton>
						{children}
					</Dialog>
				</Wrapper>
			</RemoveScroll>
		</FocusLock>
	);
}

const Wrapper = styled.div`
	position: fixed;
	inset: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 900;
`;

const Backdrop = styled.div`
	position: absolute;
	inset: 0;
	background: ${COLORS.black75};
`;

// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role
const Dialog = styled.div`
	position: relative;
	background: ${COLORS.gray.light};
	border-radius: 20px;
	padding: ${SPACING.large};
	width: 840px;
`;

const CloseButton = styled.button`
	margin: 0;
	border: 0;
	padding: 0;
	background: transparent;
	overflow: hidden;
	position: absolute;
	top: 0;
	right: 0;
	padding-bottom: ${SPACING.small};
	transform: translateY(-100%);
	color: ${COLORS.white};
	cursor: pointer;
`;

export default Modal;


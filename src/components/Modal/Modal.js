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
						<Button
							variant="close"
							size="medium"
							onClick={closeDialog}
							aria-label="Close Dialog">
							<X />
						</Button>
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
	padding: 16px;
`;

const Backdrop = styled.div`
	position: absolute;
	inset: 0;
	background: hsl(${COLORS.black75});
`;

// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role
const Dialog = styled.div`
	position: relative;
	background: ${COLORS.gray.body};
	border-radius: 20px;
	padding: ${SPACING.large};
`;

export default Modal;

/**
 * @module Modal
 * @description This React component renders a modal dialog box. It is designed to provide a focus-locked,
 * scroll-disabled overlay for displaying content. The modal can be closed by clicking the backdrop or pressing
 * the Escape key. It utilizes `FocusLock` and `RemoveScroll` for enhancing accessibility and user experience.
 *
 * @requires useEffect from React - Hook for performing side effects in functional components.
 * @requires PropTypes - For type-checking the props of the component.
 *
 * @prop {function} closeDialog - Function to close the modal.
 * @prop {string} title - The title of the modal, used for accessibility.
 * @prop {ReactNode} children - The content to be displayed inside the modal.
 */

import { useEffect } from 'react';
import styled from 'styled-components';
import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';
import { X } from 'react-feather';
import { COLORS, QUERIES, SPACING } from '../../constants';
import PropTypes from 'prop-types';
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
					<Backdrop onClick={closeDialog} data-testid="backdrop" />
					<Dialog role="dialog" aria-modal="true" aria-label={title}>
						<CloseButton onClick={closeDialog} aria-label="Close Dialog">
							<X strokeWidth={1.5} size={32} />
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

	@media ${QUERIES.tabletAndDown} {
		padding-top: 160px;
		z-index: 1001;
	}
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
	width: 924px;

	@media ${QUERIES.laptopAndDown} {
		width: 780px;
	}
	@media ${QUERIES.tabletAndDown} {
		width: 420px;
		padding: ${SPACING.micro};
		max-width: 95%;
	}
`;

const CloseButton = styled.button`
	margin: 0;
	border: 0;
	padding: 0;
	background: transparent;
	overflow: hidden;
	position: absolute;
	top: 52px;
	right: -12px;
	padding: ${SPACING.small};
	transform: translateY(-100%);
	color: ${COLORS.red};
	cursor: pointer;
	z-index: 1;

	@media ${QUERIES.phoneAndDown} {
		top: 60px;
		right: 0px;
	}
`;

export default Modal;

Modal.propTypes = {
	closeDialog: PropTypes.func,
	title: PropTypes.string,
	children: PropTypes.object,
};

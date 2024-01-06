import { useState, useId, useEffect } from 'react';
import styled from 'styled-components';
import { SPACING, QUERIES } from '../../constants';
import PageTitle from '../PageTitle';
import FormResponseField from './FormResponseField';
import StyledInput from './StyledInput';
import FormSubmitContainer from './FormSubmitContainer';
import Button from '../Button/Button';
import useToggle from '../../hooks/useToggle.hook';
import { useUser } from '../../../api/context/user.context';
import { Navigate } from 'react-router';

/**
 * @module SignInForm
 * @description Manages the user authentication process, providing forms for both login and sign-up.
 * Handles user input, form submission, and navigation based on authentication state.
 * @returns {React.Component} Component with form elements for user authentication.
 */

function SignInForm() {
	/**
	 * Manages the form state, toggling between login and sign-up views.
	 * @function
	 * @name useToggle
	 * @memberof module:SignInForm
	 * @returns {Array} An array containing a boolean state and a function to toggle it.
	 */

	const { user, login, signup } = useUser();

	const [isSignupShown, toggleIsSignupShown] = useToggle(false);
	const [formErrorMessage, setFormErrorMessage] = useState('');

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// idle / loading / success / error
	const [status, setStatus] = useState('idle');

	const id = useId();
	const firstNameId = `${id}-first-name`;
	const lastNameId = `${id}-last-name`;
	const emailId = `${id}-email`;
	const passwordId = `${id}-password`;

	const canSignUp = firstName && lastName && email && password;
	const canLogIn = email && password;

	const userActionText = isSignupShown ? 'Sign Up' : 'Login';
	const userOppositeActionText = isSignupShown ? 'Login' : 'Sign Up';

	/**
	 * Handles the form submission process for both login and sign-up.
	 * Performs validation checks and initiates the appropriate user action.
	 * @function
	 * @name handleSubmit
	 * @param {Event} event - The form submission event.
	 * @memberof module:SignInForm
	 */

	async function handleSubmit(event) {
		event.preventDefault();
		setStatus('loading');

		// preventing empty requests from happening
		if (isSignupShown && !canSignUp) return;
		if (!isSignupShown && !canLogIn) return;

		try {
			const response = isSignupShown
				? await signup(firstName, lastName, email, password)
				: await login(email, password);

			if (await response) {
				setStatus('success');
			}
		} catch (error) {
			setStatus('error');
			setFormErrorMessage(error.message);
			console.error(error);
		}
	}

	return (
		<>
			{user && <Navigate to="/" replace={true} />}

			<StyledForm onSubmit={(event) => handleSubmit(event)}>
				<PageTitle>{userActionText}</PageTitle>
				{isSignupShown && (
					<>
						{/* NEED TO HAVE VALIDATION AND MAKE SURE WE ONLY ACCEPT 1 NAME PER FIELD, AKA - NO SPACES OR SPECIAL CHARACTERS */}
						<StyledInput>
							{/* <label htmlFor={firstNameId}>First Name</label> */}
							<input
								required={true}
								disabled={status === 'loading'}
								type="text"
								id={firstNameId}
								placeholder="First Name"
								value={firstName}
								onChange={(event) => {
									setFirstName(event.target.value);
								}}
							/>
						</StyledInput>
						<StyledInput>
							{/* <label htmlFor={lastNameId}>Last Name</label> */}
							<input
								required={true}
								disabled={status === 'loading'}
								type="text"
								id={lastNameId}
								placeholder="Last Name"
								value={lastName}
								onChange={(event) => {
									setLastName(event.target.value);
								}}
							/>
						</StyledInput>
					</>
				)}
				<StyledInput>
					{/* <label htmlFor={emailId}>Email</label> */}
					<input
						required={true}
						disabled={status === 'loading'}
						type="email"
						id={emailId}
						placeholder="Email"
						value={email}
						onChange={(event) => {
							setEmail(event.target.value);
						}}
					/>
				</StyledInput>
				<StyledInput>
					{/* <label htmlFor={passwordId}>Password</label> */}
					<input
						required={true}
						disabled={status === 'loading'}
						type="password"
						id={passwordId}
						placeholder="Password"
						value={password}
						onChange={(event) => {
							setPassword(event.target.value);
						}}
					/>
				</StyledInput>
				<FormSubmitContainer>
					<Button
						variant="primary"
						size="large"
						type="submit"
						disabled={status === 'loading'}
						onClick={handleSubmit}>
						{userActionText}
					</Button>
					<Button
						variant="secondary"
						size="large"
						type="submit"
						onClick={toggleIsSignupShown}>
						{userOppositeActionText}
					</Button>
				</FormSubmitContainer>
				{status === 'error' && (
					<FormResponseField>{formErrorMessage}</FormResponseField>
				)}
			</StyledForm>
		</>
	);
}

const StyledForm = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	align-content: flex-start;
	align-items: baseline;

	padding: ${SPACING.large} ${SPACING.large};

	@media ${QUERIES.tabletAndDown} {
		padding: ${SPACING.large} ${SPACING.large};
	}

	& > * {
		margin-bottom: ${SPACING.medium};
	}
`;

export default SignInForm;


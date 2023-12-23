import { useState, useId } from 'react';
import styled from 'styled-components';
import { SPACING, QUERIES } from '../../constants';
import FormTitle from './FormTitle';
import FormResponseField from './FormResponseField';
import StyledInput from './StyledInput';
import FormSubmitContainer from './FormSubmitContainer';
import Button from '../Button/Button';
import useToggle from '../../hooks/useToggle.hook';
import { useUser } from '../../../api/context/user.context';
import { Navigate } from 'react-router';

function SignInForm() {
	const { user, login, signup, logout } = useUser();

	const [isSignupShown, toggleIsSignupShown] = useToggle(false);
	const [formErrorMessage, setFormErrorMessage] = useToggle(
		'There was an issue with your request, please try again.'
	);

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

	const userActionText = isSignupShown ? 'Sign Up' : 'Login';
	const userOppositeActionText = isSignupShown ? 'Login' : 'Sign Up';

	async function handleSubmit(event) {
		event.preventDefault();
		setStatus('loading');

		try {
			const response = isSignupShown
				? await signup(firstName, lastName, email, password)
				: await login(email, password);

			if (await response) {
				setStatus('success');
			}
		} catch (error) {
			console.log(status);
			setFormErrorMessage(error.message);
			console.error('the error:', error);
			console.error(error.type);
			console.error(error.code);
			console.error(error.message);
		}
	}

	return (
		<>
			{user && <Navigate to="/catalog" replace={true} />}

			<StyledForm onSubmit={handleSubmit}>
				<FormTitle>{userActionText}</FormTitle>
				{isSignupShown && (
					<>
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
				{formErrorMessage && (
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


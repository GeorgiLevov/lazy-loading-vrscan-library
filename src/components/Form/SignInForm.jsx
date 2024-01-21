import { useState, useId, useEffect } from 'react';
import styled from 'styled-components';
import { SPACING, QUERIES } from '../../constants';
import PageTitle from '../PageTitle';
import FormResponseField from './FormResponseField';
import StyledInput from './StyledInput';
import FormSubmitContainer from './FormSubmitContainer';
import Button from '../Button/Button';
import useToggle from '../../hooks/useToggle.hook';
import { useDispatch, useSelector } from 'react-redux';
import { login, signup } from '../../redux/slices/userSlice';

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

	const { status, error } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const id = useId();

	const [userData, setUserData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});
	const { firstName, lastName, email, password } = userData;

	const [signupShown, toggleSignupShown] = useToggle(false);
	const [enableSubmit, setEnableSubmit] = useState(false);

	const checkIfFormIsValid = () => {
		let dataIsValid = true;

		const canSignUp =
			firstName.length > 1 &&
			lastName.length > 1 &&
			email.length > 1 &&
			password.length > 1;
		const canLogIn = email.length > 1 && password.length > 1;

		// preventing empty requests from happening
		if (signupShown && !canSignUp) dataIsValid = false;
		if (!signupShown && !canLogIn) dataIsValid = false;

		setEnableSubmit(dataIsValid);
	};

	/**
	 * Handles the form submission process for both login and sign-up.
	 * Performs validation checks and initiates the appropriate user action.
	 * @function
	 * @name handleSubmit
	 * @param {Event} event - The form submission event.
	 * @memberof module:SignInForm
	 */

	async function handleSubmit() {
		signupShown
			? dispatch(signup({ firstName, lastName, email, password }))
			: dispatch(login({ email, password }));
	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		setUserData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	useEffect(() => {
		checkIfFormIsValid();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userData]);

	return (
		<>
			<StyledForm
				onSubmit={(event) => event.preventDefault()}
				autoComplete="off">
				<PageTitle>{signupShown ? 'Sign Up' : 'Login'}</PageTitle>
				{signupShown && (
					<>
						<StyledInput>
							{/* <label htmlFor={`${id}-firstName`}>First Name</label> */}
							<input
								type="text"
								id={`${id}-firstName`}
								name="firstName"
								placeholder="First Name"
								value={userData.firstName}
								onChange={handleChange}
							/>
						</StyledInput>
						<StyledInput>
							{/* <label htmlFor={`${id}-lastName`}>Last Name</label> */}
							<input
								type="text"
								id={`${id}-lastName`}
								name="lastName"
								placeholder="Last Name"
								value={userData.lastName}
								onChange={handleChange}
							/>
						</StyledInput>
					</>
				)}
				<StyledInput>
					{/* <label htmlFor={`${id}-email`}>Email</label> */}
					<input
						type="email"
						id={`${id}-email`}
						name="email"
						placeholder="Email"
						value={userData.email}
						onChange={handleChange}
						required
					/>
				</StyledInput>
				<StyledInput>
					{/* <label htmlFor={`${id}-password`}>Password</label> */}
					<input
						type="password"
						id={`${id}-password`}
						name="password"
						placeholder="Password"
						value={userData.password}
						onChange={handleChange}
						required
						minLength="8"
					/>
				</StyledInput>
				<FormSubmitContainer>
					<Button
						variant="primary"
						size="large"
						type="submit"
						disabled={!enableSubmit}
						onClick={handleSubmit}>
						{signupShown ? 'Sign Up' : 'Login'}
					</Button>
					<Button
						variant="secondary"
						size="large"
						type="submit"
						onClick={toggleSignupShown}>
						{signupShown ? 'Login' : 'Sign Up'}
					</Button>
				</FormSubmitContainer>
				{status === 'failed' && <FormResponseField>{error}</FormResponseField>}
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

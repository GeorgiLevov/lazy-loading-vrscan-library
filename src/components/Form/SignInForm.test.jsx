import { describe, expect, test } from 'vitest';
import { render, screen, fireEvent } from '../../test/test.utils';
import SignInForm from './SignInForm';
// import { Provider } from 'react-redux';
// import configureMockStore from 'redux-mock-store';

describe('SignInForm Component', () => {
	//   const mockStore = configureMockStore();
	const userState = { status: 'idle', error: null, isLoggedIn: false };

	test('renders the login form initially', () => {
		render(
			//   <Provider store={store}>
			<SignInForm />,
			{ state: userState }
			//   </Provider>
		);
		expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
	});

	test('toggles to the sign-up form', () => {
		render(
			//   <Provider store={store}>
			<SignInForm />,
			{ state: userState }
			//   </Provider>
		);
		fireEvent.click(screen.getByText('Sign Up'));
		expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
	});
});

import { describe, expect, test } from 'vitest';
import { render, screen } from '../../test/test.utils';
// import { Provider } from 'react-redux';
// import { MemoryRouter } from 'react-router-dom';
// import configureMockStore from 'redux-mock-store';
import EditImageHandler from './EditImageHandler';

const userState = {
	status: 'success',
	isLoggedIn: true,
	data: {
		name: 'John Doe',
		email: 'johndoe@example.com',
		prefs: { photo: 'profile.jpg' },
	},
};
// const mockStore = configureMockStore();

describe('EditImageHandler Component', () => {
	test('renders the component with user info and edit button', () => {
		render(<EditImageHandler />, { state: userState });

		expect(screen.getByText('John Doe')).toBeInTheDocument();
		expect(screen.getByText('johndoe@example.com')).toBeInTheDocument();
		expect(screen.getByText('Edit Profile Image')).toBeInTheDocument();
	});
});

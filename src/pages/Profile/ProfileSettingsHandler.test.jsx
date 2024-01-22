import { describe, expect, test } from 'vitest';
// import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '../../test/test.utils';
// import { Provider } from 'react-redux';
// import configureMockStore from 'redux-mock-store';
import ProfileSettingsHandler from './ProfileSettingsHandler';

// const mockStore = configureMockStore();
const userState = {
	data: { name: 'John Doe', email: 'johndoe@example.com' },
	isLoggedIn: true,
};

describe('ProfileSettingsHandler Component', () => {
	test('renders the profile settings form', () => {
		render(
			//   <Provider store={store}>
			//  <MemoryRouter>
			<ProfileSettingsHandler />,
			{ state: userState }
			// </MemoryRouter>
			//   </Provider>
		);
		expect(screen.getByLabelText('First Name')).toBeInTheDocument();
		expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
		expect(screen.getByLabelText('Email')).toBeInTheDocument();
	});
});

import { describe, expect, test } from 'vitest';
import { render, screen } from '../../test/test.utils';
import UserNav from './UserNav';

// const MockRouter = ({ children }) => (
//   <MemoryRouter>
//     {children}
//   </MemoryRouter>
// );

describe('UserNav Component', () => {
	test('renders nothing when user is not logged in', () => {
		// const mockStore = createMockStore({ user: { data: null, isLoggedIn: false } });
		render(
			//   <Provider store={mockStore}>
			// <MockRouter>
			<UserNav />,
			{ state: { data: null, isLoggedIn: false } }
			// </MockRouter>
			//   </Provider>
		);
		expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
	});

	test('renders user information when user is logged in', () => {
		// const mockStore = createMockStore({ user: { isLoggedIn: true } });
		render(
			//   <Provider store={mockStore}>
			// <MockRouter>
			<UserNav />,
			{ state: { isLoggedIn: true } }
			// </MockRouter>
			//   </Provider>
		);
		expect(screen.getByRole('navigation')).toBeInTheDocument();
		expect(screen.getByText('Favourites')).toBeInTheDocument();
	});
});

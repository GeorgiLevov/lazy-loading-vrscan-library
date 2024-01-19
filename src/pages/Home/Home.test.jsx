import { describe, expect, test } from 'vitest';
import { render, screen } from '../../test/test.utils';
// import { Provider } from 'react-redux';
// import createMockStore from '../../test/mockStore';
import Home from './Home';
// import { MemoryRouter } from 'react-router-dom';

// const MockRouter = ({ children }) => (
//     <MemoryRouter>
//       {children}
//     </MemoryRouter>
// );

describe('Home Component', () => {
	test('renders correctly when user is logged in', () => {
		// const mockStore = createMockStore({ user: { data: { name: '' }, isLoggedIn: true } });
		render(
			//   <Provider store={mockStore}>
			// <MockRouter>
			<Home />,
			{ state: { data: { name: '' }, isLoggedIn: true } }
			// </MockRouter>
			//   </Provider>
		);
		expect(screen.getByText('Explore Library')).toBeInTheDocument();
	});

	test('renders correctly when user is not logged in', () => {
		// const mockStore = createMockStore({
		// 	user: { data: null, isLoggedIn: false },
		// });
		render(
			// <Provider store={mockStore}>
			// <MockRouter>
			<Home />,
			{ state: { data: null, isLoggedIn: false } }
			// </MockRouter>
			// </Provider>
		);
		expect(screen.getByText('Sign In')).toBeInTheDocument();
	});
});

import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import createMockStore from '../../test/mockStore'; 
import UserNav from './UserNav'; 


const MockRouter = ({ children }) => (
  <MemoryRouter>
    {children}
  </MemoryRouter>
);

describe('UserNav Component', () => {
  test('renders nothing when user is not logged in', () => {
    const mockStore = createMockStore({ user: { data: null, isLoggedIn: false } });
    render(
      <Provider store={mockStore}>
        <MockRouter>
          <UserNav />
        </MockRouter>
      </Provider>
    );
    expect(screen.queryByRole('navigation')).toBeNull();
  });

  test('renders user information when user is logged in', () => {
    const mockStore = createMockStore({ user: { isLoggedIn: true } });
    render(
      <Provider store={mockStore}>
        <MockRouter>
          <UserNav />
        </MockRouter>
      </Provider>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Favourites')).toBeInTheDocument();
  });

});

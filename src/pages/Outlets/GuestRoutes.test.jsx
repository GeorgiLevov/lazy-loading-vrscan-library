import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import GuestRoutes from './GuestRoutes';

const mockStore = configureMockStore();

describe('GuestRoutes Component', () => {
  const mockUserData = {
    id: '123',
    name: 'Jane Doe',
    email: 'jane@example.com'
  };

  test('renders Outlet when no user is logged in and loading is complete', () => {
    const store = mockStore({
      user: {
        data: null,
      },
      loader: {
        loadingCounter: 0,
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/guest']}>
          <Routes>
            <Route path="/guest" element={<GuestRoutes />}>
              <Route path="" element={<div>Guest Content</div>} />
            </Route>
            <Route path="/" element={<div>Home Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Guest Content')).toBeInTheDocument();
  });

  test('redirects to home when user is present', () => {
    const store = mockStore({
      user: {
        data: mockUserData,
      },
      loader: {
        loadingCounter: 0,
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/guest']}>
          <Routes>
            <Route path="/guest" element={<GuestRoutes />} />
            <Route path="/" element={<div>Home Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

});

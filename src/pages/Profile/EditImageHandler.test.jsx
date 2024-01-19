import { describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import EditImageHandler from './EditImageHandler';

const mockStore = configureMockStore();
const store = mockStore({
  user: {
    data: { name: 'John Doe', email: 'johndoe@example.com', prefs: { photo: 'profile.jpg' }},
    status: 'idle',
    isLoggedIn: true
  }
});

describe('EditImageHandler Component', () => {
  test('renders the component with user info and edit button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <EditImageHandler />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('johndoe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Edit Profile Image')).toBeInTheDocument();
  });

});

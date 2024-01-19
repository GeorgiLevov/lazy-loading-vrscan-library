import { describe, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Profile from './Profile';


const mockUserData = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  isLoggedIn: true

};

const mockStore = configureMockStore();
const store = mockStore({
  user: {
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      prefs: {
        photo: 'mock-photo.jpg' 
      }
    },
    isLoggedIn: true
  }
});

describe('Profile Component', () => {
    test('renders profile components when user is logged in', () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Profile />
          </MemoryRouter>
        </Provider>
      );
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Account settings')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument(); // Use the name from the mock store
      expect(screen.getByText('johndoe@example.com')).toBeInTheDocument();
    });
});



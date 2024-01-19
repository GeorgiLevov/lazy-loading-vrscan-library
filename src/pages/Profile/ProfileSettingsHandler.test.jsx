import { describe, expect, test, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ProfileSettingsHandler from './ProfileSettingsHandler';

const mockStore = configureMockStore();
const store = mockStore({
  user: {
    data: { name: 'John Doe', email: 'johndoe@example.com' },
    isLoggedIn: true
  }
});

describe('ProfileSettingsHandler Component', () => {
  test('renders the profile settings form', () => {
    render(
      <Provider store={store}>
         <MemoryRouter>
        <ProfileSettingsHandler />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
   
  });

});

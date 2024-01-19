import { describe, expect, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SignInForm from './SignInForm'; 
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store'; 


describe('SignInForm Component', () => {
  const mockStore = configureMockStore();
  const store = mockStore({
    user: { status: 'idle', error: null, isLoggedIn: false }
  });

  test('renders the login form initially', () => {
    render(
      <Provider store={store}>
        <SignInForm />
      </Provider>
    );
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  test('toggles to the sign-up form', () => {
    render(
      <Provider store={store}>
        <SignInForm />
      </Provider>
    );
    fireEvent.click(screen.getByText('Sign Up'));
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
  });

});

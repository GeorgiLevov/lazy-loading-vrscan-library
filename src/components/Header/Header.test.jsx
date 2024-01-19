import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store/index'; 
import Header from './Header';
import { toHaveStyleRule } from '@testing-library/jest-dom';


describe('Header Component', () => {
  test('renders without errors', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();
  });

  test('container-header is present', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    const containerHeader = screen.getByTestId('container-header');
    const computedStyles = getComputedStyle(containerHeader);
    expect(computedStyles.backgroundColor).toBe('rgba(0, 0, 0, 0)');
    expect(computedStyles.padding).toBe('25px 0px');
    expect(containerHeader).toBeInTheDocument();

  });
});

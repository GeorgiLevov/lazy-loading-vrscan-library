import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VRScansProvider } from '../../../api/context/vrscans.context';
import Catalog from './Catalog';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();

describe('Catalog Component', () => {
  const store = mockStore({
    user: {
      data: { prefs: { favorites: [] } },
    },
  });

  test('renders the Catalog component with essential elements', () => {
    render(
      <Provider store={store}>
        <VRScansProvider>
          <Catalog />
        </VRScansProvider>
      </Provider>
    );

    expect(screen.getByText('VRScans Catalog')).toBeInTheDocument();
    
  });
  
});

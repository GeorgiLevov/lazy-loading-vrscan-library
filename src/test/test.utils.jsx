/* eslint-disable react-refresh/only-export-components */
import { cleanup, render } from '@testing-library/react';
import { afterEach } from 'vitest';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { userIinitialState } from '../redux/slices/userSlice';
import { VRScansProvider } from '../../api/context/vrscans.context';
import { BrowserRouter } from 'react-router-dom';

afterEach(() => {
	cleanup();
});

function customRender(
	ui,
	options = { initialState: userIinitialState, store: store }
) {
	function Wrapper({ children }) {
		// eslint-disable-next-line no-unused-vars
		return (
			<BrowserRouter>
				<Provider store={store}>
					<VRScansProvider>{children}</VRScansProvider>
				</Provider>
			</BrowserRouter>
		);
	}

	return render(ui, {
		// wrap provider(s) here
		wrapper: Wrapper,
		...options,
	});
}

export * from '@testing-library/react';
export * from '@testing-library/dom';

export { default as userEvent } from '@testing-library/user-event';
// override render export
export { customRender as render };

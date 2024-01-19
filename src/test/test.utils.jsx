/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-refresh/only-export-components */
import { cleanup, render } from '@testing-library/react';
import { afterEach } from 'vitest';
import { Provider } from 'react-redux';
import { VRScansProvider } from '../../api/context/vrscans.context';
import { BrowserRouter } from 'react-router-dom';
import createMockStore from './mockStore';
import PropTypes from 'prop-types';

afterEach(() => {
	cleanup();
});

const userInitialState = {
	status: 'idle', // 'idle' | 'loading' | 'success' | 'failed'
	isLoggedIn: false,
	data: null,
	error: '',
};

function customRender(
	ui,
	{ state = userInitialState, store = createMockStore(state), ...options } = {}
) {
	// space
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

	Wrapper.propTypes = {
		children: PropTypes.object,
		state: PropTypes.object,
	};

	Wrapper.defaultProps = {
		children: PropTypes.object,
		state: userInitialState,
	};

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

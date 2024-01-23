/* c8 ignore start */
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import App from './components/App';
import GlobalStyles from '../GlobalStyles';
import React from 'react';

ReactDOM.createRoot(document.getElementById('root')).render(
	// Automatically reruns effects
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
			<GlobalStyles />
		</BrowserRouter>
	</React.StrictMode>
);

/* c8 ignore end */

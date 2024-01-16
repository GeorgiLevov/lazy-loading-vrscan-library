import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import App from './components/App';
import GlobalStyles from '../GlobalStyles';

ReactDOM.createRoot(document.getElementById('root')).render(
	// Automatically reruns effects
	// <React.StrictMode>
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
		<GlobalStyles />
	</BrowserRouter>
	// </React.StrictMode>
);

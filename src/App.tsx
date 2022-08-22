import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { store } from './app/store';
import { routes } from './routes';
import { Header } from './components';
import { ToastContainer } from 'react-toastify';

export const App: React.FC = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Header />
				<Routes>
					{routes.map((route) => (
						<Route key={route.path} {...route} />
					))}
					<Route path="*" element={<Navigate to={routes[0]?.path ?? '/'} replace={true} />} />
				</Routes>
			</BrowserRouter>
			<ToastContainer position="bottom-left" />
		</Provider>
	);
};

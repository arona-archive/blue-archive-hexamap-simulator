import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { store } from './app/store';
import { routes } from './routes';
import { Header } from './components';
import { ToastContainer } from 'react-toastify';
import { DatabaseService } from './services';

export const App: React.FC = () => {
	const [initialized, setInitialized] = useState(false);

	useEffect(() => {
		(async () => {
			const service = new DatabaseService();
			await service.initialize();

			setInitialized(true);
		})();
	}, []);

	if (!initialized) {
		return null;
	}

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

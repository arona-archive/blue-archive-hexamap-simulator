import React from 'react';
import { MainPage } from '../pages';

export interface Route {
	index?: boolean;
	path: string;
	name: string;
	root?: boolean;
	element: React.ReactNode;
}

export const routes: Route[] = [{ path: '/', name: 'main', index: true, root: false, element: <MainPage /> }];

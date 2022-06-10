import React from 'react';
import { useAppSelector } from '../../hooks';
import { getMetadata } from '../../reducers';
import { Page } from '../../components';

export const MainPage: React.FC = () => {
	const metadata = useAppSelector(getMetadata);

	return (
		<Page title="main">
			<pre>{JSON.stringify(metadata, null, 2)}</pre>
		</Page>
	);
};

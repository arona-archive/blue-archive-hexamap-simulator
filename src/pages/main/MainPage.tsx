import React from 'react';
import { Page } from '../../components';
import { LocalizationTextTable } from '../../constants';
import { useAppSelector } from '../../hooks';
import { getMetadata } from '../../reducers';

export const MainPage: React.FC = () => {
	const metadata = useAppSelector(getMetadata);

	return (
		<Page breadcrumbs={[{ name: LocalizationTextTable.main_page, path: '/' }]}>
			<pre>{JSON.stringify(metadata, null, 2)}</pre>
		</Page>
	);
};

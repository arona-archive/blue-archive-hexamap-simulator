import React from 'react';
import { Page } from '../../components';
import { LocalizationTextKey, LocalizationTextTable } from '../../constants';
import { useAppSelector } from '../../hooks';
import { getMetadata } from '../../reducers';

export const MainPage: React.FC = () => {
	const metadata = useAppSelector(getMetadata);

	return (
		<Page breadcrumbs={[{ name: LocalizationTextTable[LocalizationTextKey.HOME], path: '/' }]}>
			<pre>{JSON.stringify(metadata, null, 2)}</pre>
		</Page>
	);
};

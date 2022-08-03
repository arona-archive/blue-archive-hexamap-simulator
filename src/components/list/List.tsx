import React from 'react';
import { LocalizationKey } from '../../constants';
import { useTranslation } from '../../hooks';
import { ListHeader } from './ListHeader';

interface IProps {
	titleKey: LocalizationKey;
	children: React.ReactNode;
}

export const List: React.FC<IProps> = (props) => {
	const { titleKey, children } = props;

	const title = useTranslation(titleKey);

	return (
		<div className="list-group">
			<ListHeader title={title} />
			{children}
		</div>
	);
};

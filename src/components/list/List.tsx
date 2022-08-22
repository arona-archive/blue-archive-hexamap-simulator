import React from 'react';
import styled from 'styled-components';
import { LocalizationKey } from '../../constants';
import { useTranslation } from '../../hooks';
import { ListHeader } from './ListHeader';

const Root = styled.div`
	&:not(:first-child) {
		margin-top: 12px;
	}
`;

interface IProps {
	titleKey: LocalizationKey;
	children: React.ReactNode;
}

export const List: React.FC<IProps> = (props) => {
	const { titleKey, children } = props;

	const title = useTranslation(titleKey);

	return (
		<Root className="list-group">
			<ListHeader title={title} />
			{children}
		</Root>
	);
};

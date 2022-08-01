import React from 'react';
import { ListHeader } from './ListHeader';

interface IProps {
	title: string;
	children: React.ReactNode;
}

export const List: React.FC<IProps> = (props) => {
	const { title, children } = props;

	return (
		<div className="list-group">
			<ListHeader title={title} />
			{children}
		</div>
	);
};

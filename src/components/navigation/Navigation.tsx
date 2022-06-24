import React from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../hooks';
import { INavigationPath } from '../../types';

const Nav = styled.nav`
	user-select: none;
`;

const ListItem = styled.li`
	text-align: center;
`;

interface Props {
	prev?: INavigationPath;
	next?: INavigationPath;
}

export const Navigation: React.FC<Props> = (props) => {
	const { prev, next } = props;

	const prevName = useTranslation(prev?.name);
	const nextName = useTranslation(next?.name);

	return (
		<Nav>
			<ul className="pagination">
				<ListItem className="page-item w-50">
					{prev ? (
						<a className="page-link" href={prev.path}>
							{prevName}
						</a>
					) : (
						<div className="page-link disabled">-</div>
					)}
				</ListItem>
				<ListItem className="page-item w-50">
					{next ? (
						<a className="page-link" href={next.path}>
							{nextName}
						</a>
					) : (
						<div className="page-link disabled">-</div>
					)}
				</ListItem>
			</ul>
		</Nav>
	);
};

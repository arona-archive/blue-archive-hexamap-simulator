import React from 'react';
import { Link } from 'react-router-dom';
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
						<Link className="page-link" to={prev.path}>
							{prevName}
						</Link>
					) : (
						<div className="page-link disabled">-</div>
					)}
				</ListItem>
				<ListItem className="page-item w-50">
					{next ? (
						<Link className="page-link" to={next.path}>
							{nextName}
						</Link>
					) : (
						<div className="page-link disabled">-</div>
					)}
				</ListItem>
			</ul>
		</Nav>
	);
};

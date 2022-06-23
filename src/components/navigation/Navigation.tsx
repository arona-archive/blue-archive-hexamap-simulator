import React from 'react';
import styled from 'styled-components';
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

	return (
		<Nav>
			<ul className="pagination d-flex">
				<ListItem className="page-item flex-grow-1">
					{prev ? (
						<a className="page-link" href={prev.path}>
							{prev.name}
						</a>
					) : (
						<div className="page-link disabled">-</div>
					)}
				</ListItem>
				<ListItem className="page-item flex-grow-1">
					{next ? (
						<a className="page-link" href={next.path}>
							{next.name}
						</a>
					) : (
						<div className="page-link disabled">-</div>
					)}
				</ListItem>
			</ul>
		</Nav>
	);
};

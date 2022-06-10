import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

interface Props {
	to: string;
	children?: React.ReactNode;
}

export const HeaderLink: React.FC<Props> = (props) => {
	const { to } = props;

	const resolvedPath = useResolvedPath(to);
	const match = useMatch({ path: resolvedPath.pathname, end: true });

	return (
		<li className="nav-item">
			<Link className={`nav-link ${!!match && 'active'}`} to={to}>
				{props.children}
			</Link>
		</li>
	);
};

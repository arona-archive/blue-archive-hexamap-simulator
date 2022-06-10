import React from 'react';
import styled from 'styled-components';
import { routes } from '../../routes';
import { HeaderLink } from './HeaderLink';

const Nav = styled.nav`
	user-select: none;
`;

export const Header: React.FC = () => {
	return (
		<Nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
			<div className="container-lg">
				<a className="navbar-brand" href="/">
					blue-archive-hexamap-simulator
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarTogglerDemo02"
					aria-controls="navbarTogglerDemo02"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						{routes
							.filter((x) => x.root)
							.map((route) => (
								<HeaderLink key={route.name} to={route.path}>
									{route.name}
								</HeaderLink>
							))}
					</ul>
				</div>
			</div>
		</Nav>
	);
};

import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks';
import { getMetadata } from '../../reducers';

const Nav = styled.nav`
	user-select: none;
`;

export const Header: React.FC = () => {
	const metadata = useAppSelector(getMetadata);

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
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								href="#"
								id="navbarDropdown"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								campaigns
							</a>
							<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
								{metadata.campaigns.map((campaign) => (
									<li key={campaign.id}>
										<a className="dropdown-item" href={`/campaign/${campaign.id}`}>
											{campaign.id}
										</a>
									</li>
								))}
							</ul>
						</li>
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								href="#"
								id="navbarDropdown"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								events
							</a>
							<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
								{metadata.events.map((event) => (
									<li key={event.id}>
										<a className="dropdown-item" href={`/event/${event.id}`}>
											{event.id}
										</a>
									</li>
								))}
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</Nav>
	);
};

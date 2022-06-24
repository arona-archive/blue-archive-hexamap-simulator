import React, { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { LanguageCode, LocalizationTextTable } from '../../constants';
import { useAppDispatch, useAppSelector, useTranslation } from '../../hooks';
import { getLanguageCode, getMetadata, setLanguageCode } from '../../reducers';
import { getCampaignName, getEventName, getText } from '../../utils';

const Nav = styled.nav`
	user-select: none;
`;

export const Header: React.FC = () => {
	const dispatch = useAppDispatch();

	const languageCode = useAppSelector(getLanguageCode);
	const metadata = useAppSelector(getMetadata);

	const location = useLocation();

	const campaignItems = useMemo(() => {
		return metadata.campaigns.map((campaign) => ({
			key: campaign.id,
			label: getCampaignName(campaign.id)[languageCode],
			path: `/campaign/${campaign.id}`,
		}));
	}, [metadata.campaigns, languageCode]);

	const eventItems = useMemo(() => {
		return metadata.events.map((event) => ({
			key: event.id,
			label: getEventName(event.id)[languageCode],
			path: `/event/${event.id}`,
		}));
	}, [metadata.events, languageCode]);

	const languageItems = useMemo(() => {
		return Object.values(LanguageCode).map((x) => ({ key: x, label: LocalizationTextTable.language[x] }));
	}, []);

	const languageText = useTranslation(LocalizationTextTable.language);
	const campaignText = useTranslation(getText(1));
	const eventText = useTranslation(getText(2));

	const handleClickLanguageCode = useCallback((code: LanguageCode) => {
		return () => dispatch(setLanguageCode(code));
	}, []);

	return (
		<header className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
			<Nav className="container-lg">
				<a className="navbar-brand" href="/">
					blue-archive-hexamap-simulator
				</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="offcanvas offcanvas-end"
					tabIndex={-1}
					id="offcanvasNavbar"
					aria-labelledby="offcanvasNavbarLabel"
				>
					<div className="offcanvas-header px-4 pb-0">
						<h5 className="offcanvas-title" id="offcanvasNavbarLabel" />
						<button type="button" className="btn-close" data-bs-dismiss="offcanvas" />
					</div>
					<div className="offcanvas-body p-4 pt-0 p-lg-0">
						<hr className="d-lg-none text-white-50" />

						<ul className="navbar-nav">
							<li className="nav-item dropdown">
								<button
									className={`btn btn-link nav-link dropdown-toggle ${
										location.pathname.startsWith('/campaign') ? 'active' : ''
									}`}
									data-bs-toggle="dropdown"
								>
									{campaignText}
								</button>
								<ul className="dropdown-menu">
									{campaignItems.map((campaignItem) => (
										<li key={campaignItem.key}>
											<a
												className={`dropdown-item ${location.pathname.startsWith(campaignItem.path) ? 'current' : ''}`}
												href={campaignItem.path}
											>
												{campaignItem.label}
											</a>
										</li>
									))}
								</ul>
							</li>
							<li className="nav-item dropdown">
								<button
									className={`btn btn-link nav-link dropdown-toggle ${
										location.pathname.startsWith('/event') ? 'active' : ''
									}`}
									data-bs-toggle="dropdown"
								>
									{eventText}
								</button>
								<ul className="dropdown-menu">
									{eventItems.map((eventItem) => (
										<li key={eventItem.key}>
											<a
												className={`dropdown-item ${location.pathname.startsWith(eventItem.path) ? 'current' : ''}`}
												href={eventItem.path}
											>
												{eventItem.label}
											</a>
										</li>
									))}
								</ul>
							</li>
						</ul>

						<hr className="d-lg-none text-white-50" />

						<ul className="navbar-nav ms-auto">
							<li className="nav-item dropdown">
								<button
									className="btn btn-link nav-link dropdown-toggle"
									data-bs-toggle="dropdown"
									data-bs-display="static"
								>
									{languageText}
								</button>
								<ul className="dropdown-menu">
									{languageItems.map((languageItem) => (
										<li key={languageItem.key}>
											<a
												className={`dropdown-item ${languageCode === languageItem.key ? 'current' : ''}`}
												onClick={handleClickLanguageCode(languageItem.key)}
											>
												{languageItem.label}
											</a>
										</li>
									))}
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</Nav>
		</header>
	);
};

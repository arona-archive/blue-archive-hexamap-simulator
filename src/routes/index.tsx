import React from 'react';
import { CampaignStagePage, EventStagePage, MainPage } from '../pages';
import { CampaignPage } from '../pages/campaign/CampaignPage';
import { EventPage } from '../pages/event/EventPage';

export interface Route {
	index?: boolean;
	path: string;
	name: string;
	root?: boolean;
	element: React.ReactNode;
}

export const routes: Route[] = [
	{ path: '/', name: 'main', index: true, root: false, element: <MainPage /> },
	{ path: '/campaign/:campaignId', name: 'campaign stages', element: <CampaignPage /> },
	{ path: '/campaign/:campaignId/:stageId', name: 'campaign stage', element: <CampaignStagePage /> },
	{ path: '/event/:eventId', name: 'event stages', element: <EventPage /> },
	{ path: '/event/:eventId/:stageId', name: 'event stage', element: <EventStagePage /> },
];

import React from 'react';
import {
	CampaignsPage,
	CampaignStagePage,
	CampaignStagesPage,
	EventsPage,
	EventStagePage,
	EventStagesPage,
	MainPage,
} from '../pages';

export interface Route {
	index?: boolean;
	path: string;
	name: string;
	root?: boolean;
	element: React.ReactNode;
}

export const routes: Route[] = [
	{ path: '/', name: 'main', index: true, root: false, element: <MainPage /> },
	{ path: '/campaigns', name: 'campaigns', root: true, element: <CampaignsPage />, index: true },
	{ path: '/campaign_stages/:campaignId', name: 'campaign stages', element: <CampaignStagesPage /> },
	{ path: '/campaign_stage/:stageId', name: 'campaign stage', element: <CampaignStagePage /> },
	{ path: '/events', name: 'events', root: true, element: <EventsPage /> },
	{ path: '/event_stages/:eventId', name: 'event stages', element: <EventStagesPage /> },
	{ path: '/event_stage/:stageId', name: 'event stage', element: <EventStagePage /> },
];

import React from 'react';
import { CampaignsPage, CampaignStagePage, CampaignStagesPage, MainPage } from '../pages';

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
];

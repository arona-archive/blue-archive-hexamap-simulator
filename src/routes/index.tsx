import React from 'react';
import { LocalizationKey } from '../constants';
import { CampaignStagePage, EventStagePage, MainPage } from '../pages';
import { CampaignPage } from '../pages/campaign/CampaignPage';
import { EventPage } from '../pages/event/EventPage';

export interface IRoute {
	index?: boolean;
	path: string;
	localizationKey: LocalizationKey;
	root?: boolean;
	element: React.ReactNode;
}

export const routes: IRoute[] = [
	{ path: '/', localizationKey: LocalizationKey.HOME, index: true, root: false, element: <MainPage /> },
	{
		path: '/campaign/:campaignId',
		localizationKey: LocalizationKey.CAMPAIGN_NAME,
		element: <CampaignPage />,
	},
	{
		path: '/campaign/:campaignId/:stageId',
		localizationKey: LocalizationKey.CAMPAIGN_STAGE_NAME,
		element: <CampaignStagePage />,
	},
	{
		path: '/event/:eventId',
		localizationKey: LocalizationKey.EVENT_NAME,
		element: <EventPage />,
	},
	{
		path: '/event/:eventId/:stageId',
		localizationKey: LocalizationKey.EVENT_STAGE_NAME,
		element: <EventStagePage />,
	},
];

import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { List, Page } from '../../components';
import { LocalizationTextKey, LocalizationTextTable } from '../../constants';
import { useAppSelector, useTranslation } from '../../hooks';
import { getLanguageCode, getMetadata } from '../../reducers';
import { getCampaignName, getEventName } from '../../utils';

export const MainPage: React.FC = () => {
	const languageCode = useAppSelector(getLanguageCode);
	const metadata = useAppSelector(getMetadata);

	const campaignTitle = useTranslation(LocalizationTextKey.CAMPAIGNS);
	const eventTitle = useTranslation(LocalizationTextKey.EVENTS);

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

	return (
		<Page breadcrumbs={[{ name: LocalizationTextTable[LocalizationTextKey.HOME], path: '/' }]}>
			<List title={campaignTitle}>
				{campaignItems.map((campaign) => (
					<Link key={campaign.key} className="list-group-item" to={campaign.path}>
						{campaign.label}
					</Link>
				))}
			</List>
			<List title={eventTitle}>
				{eventItems.map((event) => (
					<Link key={event.key} className="list-group-item" to={event.path}>
						{event.label}
					</Link>
				))}
			</List>
		</Page>
	);
};

import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { List, Page } from '../../components';
import { LocalizationKey } from '../../constants';
import { useAppSelector } from '../../hooks';
import { getLanguageCode, getMetadata } from '../../reducers';
import { getCampaignName } from '../../utils';

export const MainPage: React.FC = () => {
	const languageCode = useAppSelector(getLanguageCode);
	const metadata = useAppSelector(getMetadata);

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
			label: event.name[languageCode],
			path: `/event/${event.id}`,
		}));
	}, [metadata.events, languageCode]);

	return (
		<Page>
			<List titleKey={LocalizationKey.CAMPAIGNS}>
				{campaignItems.map((campaign) => (
					<Link key={campaign.key} className="list-group-item" to={campaign.path}>
						{campaign.label}
					</Link>
				))}
			</List>
			<List titleKey={LocalizationKey.EVENTS}>
				{eventItems.map((event) => (
					<Link key={event.key} className="list-group-item" to={event.path}>
						{event.label}
					</Link>
				))}
			</List>
		</Page>
	);
};

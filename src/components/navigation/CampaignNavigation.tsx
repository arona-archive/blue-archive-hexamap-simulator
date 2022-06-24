import React, { useMemo } from 'react';
import { useAppSelector } from '../../hooks';
import { getMetadata } from '../../reducers';
import { INavigationPath } from '../../types';
import { getCampaignName } from '../../utils';
import { Navigation } from './Navigation';

interface Props {
	campaignId: number;
}

export const CampaignNavigation: React.FC<Props> = (props) => {
	const { campaignId } = props;

	const metadata = useAppSelector(getMetadata);

	const prev = useMemo<INavigationPath | undefined>(() => {
		const index = metadata.campaigns.findIndex((x) => x.id === campaignId);
		const campaign = metadata.campaigns[index - 1];
		if (!campaign) {
			return;
		}

		return {
			path: `/campaign/${campaign.id}`,
			name: getCampaignName(campaign.id),
		};
	}, [campaignId]);

	const next = useMemo<INavigationPath | undefined>(() => {
		const index = metadata.campaigns.findIndex((x) => x.id === campaignId);
		const campaign = metadata.campaigns[index + 1];
		if (!campaign) {
			return;
		}

		return {
			path: `/campaign/${campaign.id}`,
			name: getCampaignName(campaign.id),
		};
	}, [campaignId]);

	return <Navigation prev={prev} next={next} />;
};

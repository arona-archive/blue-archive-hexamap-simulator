import React from 'react';
import { useAppSelector } from '../../hooks';
import { getMetadata } from '../../reducers';
import { Page } from '../../components';
import { CampaignEntry } from './CampaignEntry';

export const CampaignsPage: React.FC = () => {
	const metadata = useAppSelector(getMetadata);

	return (
		<Page title={`campaigns`}>
			<div className="list-group">
				<div className="list-group-item list-group-item-primary">campaigns</div>
				{metadata.campaigns.map((campaign) => (
					<CampaignEntry key={campaign.id} campaign={campaign} />
				))}
			</div>
		</Page>
	);
};

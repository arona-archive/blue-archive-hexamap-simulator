import React from 'react';
import { Link } from 'react-router-dom';
import { ICampaignMetadata } from '../../types';

interface Props {
	campaign: ICampaignMetadata;
}

export const CampaignEntry: React.FC<Props> = (props) => {
	const { campaign } = props;

	return (
		<Link className="list-group-item" to={`/campaign_stages/${campaign.id}`}>
			{campaign.id}
		</Link>
	);
};

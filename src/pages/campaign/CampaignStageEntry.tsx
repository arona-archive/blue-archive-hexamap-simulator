import React from 'react';
import { Link } from 'react-router-dom';
import { IStageMetadata } from '../../types';

interface Props {
	campaignId: number;
	stage: IStageMetadata;
}

export const CampaignStageEntry: React.FC<Props> = (props) => {
	const { campaignId, stage } = props;

	return (
		<Link className="list-group-item" to={`/campaign/${campaignId}/${stage.id}`}>
			{stage.id}
		</Link>
	);
};

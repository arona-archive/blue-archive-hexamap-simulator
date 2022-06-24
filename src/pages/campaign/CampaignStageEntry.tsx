import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks';
import { getStageName } from '../../utils';

interface Props {
	campaignId: number;
	stageId: number;
}

export const CampaignStageEntry: React.FC<Props> = (props) => {
	const { campaignId, stageId } = props;

	const stageName = useTranslation(getStageName(stageId));

	return (
		<Link className="list-group-item" to={`/campaign/${campaignId}/${stageId}`}>
			{stageName}
		</Link>
	);
};

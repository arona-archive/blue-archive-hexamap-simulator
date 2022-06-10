import React from 'react';
import { Link } from 'react-router-dom';
import { IStageMetadata } from '../../types';

interface Props {
	stage: IStageMetadata;
}

export const CampaignStageEntry: React.FC<Props> = (props) => {
	const { stage } = props;

	return (
		<Link className="list-group-item" to={`/campaign_stage/${stage.id}`}>
			{stage.id}
		</Link>
	);
};

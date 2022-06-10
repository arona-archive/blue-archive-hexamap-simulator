import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { DifficultyType } from '../../constants';
import { useAppSelector } from '../../hooks';
import { getMetadata } from '../../reducers';
import { Page } from '../../components';
import { CampaignStageEntry } from './CampaignStageEntry';

export const CampaignStagesPage: React.FC = (props) => {
	const metadata = useAppSelector(getMetadata);

	const params = useParams();

	const campaignId = useMemo(() => {
		if (!params.campaignId) {
			return -1;
		}
		return parseInt(params.campaignId, 10);
	}, [params.campaignId]);

	const campaign = useMemo(() => {
		return metadata.campaigns.find((x) => x.id === campaignId);
	}, [campaignId]);

	const normalStages = useMemo(() => {
		return campaign?.stages.filter((x) => x.difficultyType === DifficultyType.NORMAL);
	}, [campaign?.stages]);

	const hardStages = useMemo(() => {
		return campaign?.stages.filter((x) => x.difficultyType === DifficultyType.HARD);
	}, [campaign?.stages]);

	return (
		<Page title={`campaign stages / ${campaignId}`}>
			<div className="list-group">
				<div className="list-group-item list-group-item-primary">normal stages</div>
				{normalStages?.map((stage) => (
					<CampaignStageEntry key={stage.id} stage={stage} />
				))}
			</div>
			<div className="list-group">
				<div className="list-group-item list-group-item-primary">hard stages</div>
				{hardStages?.map((stage) => (
					<CampaignStageEntry key={stage.id} stage={stage} />
				))}
			</div>
		</Page>
	);
};

import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { DifficultyType } from '../../constants';
import { useAppSelector } from '../../hooks';
import { getMetadata } from '../../reducers';
import { CampaignNavigation, Page } from '../../components';
import { CampaignStageEntry } from './CampaignStageEntry';

export const CampaignPage: React.FC = () => {
	const params = useParams<{ campaignId: string }>();

	const metadata = useAppSelector(getMetadata);

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

	if (!campaignId) {
		return null;
	}

	return (
		<Page
			breadcrumbs={[
				{ name: 'main', path: '/' },
				{ name: campaignId, path: `/campaign/${campaignId}` },
			]}
		>
			<CampaignNavigation campaignId={campaignId} />
			<div className="list-group">
				<div className="list-group-item list-group-item-primary">normal stages</div>
				{normalStages?.map((stage) => (
					<CampaignStageEntry key={stage.id} campaignId={campaignId} stage={stage} />
				))}
			</div>
			<div className="list-group">
				<div className="list-group-item list-group-item-primary">hard stages</div>
				{hardStages?.map((stage) => (
					<CampaignStageEntry key={stage.id} campaignId={campaignId} stage={stage} />
				))}
			</div>
		</Page>
	);
};

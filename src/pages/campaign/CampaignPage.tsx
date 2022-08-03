import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { CampaignNavigation, List, Page } from '../../components';
import { DifficultyType, LocalizationKey } from '../../constants';
import { useAppSelector } from '../../hooks';
import { getMetadata } from '../../reducers';
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

	const campaign = useMemo(() => metadata.campaigns.find((x) => x.id === campaignId), [campaignId]);

	const normalStages = useMemo(() => {
		if (!campaign?.stages) {
			return [];
		}
		return campaign.stages.filter((x) => x.difficultyType === DifficultyType.NORMAL);
	}, [campaign?.stages]);

	const hardStages = useMemo(() => {
		if (!campaign?.stages) {
			return [];
		}
		return campaign.stages.filter((x) => x.difficultyType === DifficultyType.HARD);
	}, [campaign?.stages]);

	if (!campaign) {
		return null;
	}

	return (
		<Page>
			<CampaignNavigation campaignId={campaign.id} />
			<List titleKey={LocalizationKey.NORMAL}>
				{normalStages.map((stage) => (
					<CampaignStageEntry key={stage.id} campaignId={campaign.id} stageId={stage.id} />
				))}
			</List>
			<List titleKey={LocalizationKey.HARD}>
				{hardStages.map((stage) => (
					<CampaignStageEntry key={stage.id} campaignId={campaign.id} stageId={stage.id} />
				))}
			</List>
		</Page>
	);
};

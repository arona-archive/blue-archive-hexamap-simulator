import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CampaignNavigation, List, Page } from '../../components';
import { DifficultyType, LocalizationKey } from '../../constants';
import { useAppSelector } from '../../hooks';
import { getMetadata } from '../../reducers';
import { DatabaseService } from '../../services';
import { IStageStars } from '../../types';
import { CampaignStageEntry } from './CampaignStageEntry';

export const CampaignPage: React.FC = () => {
	const [stageStars, setStageStars] = useState<{ stageId: number; stars: IStageStars }[]>([]);

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
		return campaign.stages
			.filter((x) => x.difficultyType === DifficultyType.NORMAL)
			.map((stage) => {
				const stars = stageStars.find((x) => x.stageId === stage.id);
				return { stage, stars: stars?.stars };
			});
	}, [campaign?.stages, stageStars]);

	const hardStages = useMemo(() => {
		if (!campaign?.stages) {
			return [];
		}
		return campaign.stages
			.filter((x) => x.difficultyType === DifficultyType.HARD)
			.map((stage) => {
				const stars = stageStars.find((x) => x.stageId === stage.id);
				return { stage, stars: stars?.stars };
			});
	}, [campaign?.stages, stageStars]);

	useEffect(() => {
		(async () => {
			const service = new DatabaseService();
			const solutions = await service.getStageSolutions();
			if (!solutions) {
				return;
			}

			const stageStars = solutions.map((solution) => ({ stageId: solution.stageId, stars: solution.stars }));
			setStageStars(stageStars);
		})();
	}, [campaignId]);

	if (!campaign) {
		return null;
	}

	return (
		<Page>
			<CampaignNavigation campaignId={campaign.id} />
			<List titleKey={LocalizationKey.NORMAL}>
				{normalStages.map(({ stage, stars }) => (
					<CampaignStageEntry key={stage.id} campaignId={campaign.id} stageId={stage.id} stars={stars} />
				))}
			</List>
			<List titleKey={LocalizationKey.HARD}>
				{hardStages.map(({ stage, stars }) => (
					<CampaignStageEntry key={stage.id} campaignId={campaign.id} stageId={stage.id} stars={stars} />
				))}
			</List>
		</Page>
	);
};

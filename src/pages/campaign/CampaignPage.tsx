import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CampaignNavigation, Page } from '../../components';
import { DifficultyType, LocalizationTextKey, LocalizationTextTable } from '../../constants';
import { useAppSelector } from '../../hooks';
import { getMetadata } from '../../reducers';
import { getCampaignName } from '../../utils';
import { CampaignStageEntry } from './CampaignStageEntry';

const ListHeader = styled.div`
	user-select: none;
`;

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
		<Page
			breadcrumbs={[
				{ name: LocalizationTextTable[LocalizationTextKey.HOME], path: '/' },
				{ name: getCampaignName(campaign.id), path: `/campaign/${campaign.id}` },
			]}
		>
			<CampaignNavigation campaignId={campaign.id} />
			<div className="list-group">
				<ListHeader className="list-group-item list-group-item-primary">Normal</ListHeader>
				{normalStages.map((stage) => (
					<CampaignStageEntry key={stage.id} campaignId={campaign.id} stageId={stage.id} />
				))}
			</div>
			<div className="list-group">
				<ListHeader className="list-group-item list-group-item-primary">Hard</ListHeader>
				{hardStages.map((stage) => (
					<CampaignStageEntry key={stage.id} campaignId={campaign.id} stageId={stage.id} />
				))}
			</div>
		</Page>
	);
};

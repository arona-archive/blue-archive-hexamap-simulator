import React, { useMemo } from 'react';
import { useAppSelector } from '../../hooks';
import { getMetadata } from '../../reducers';
import { INavigationPath } from '../../types';
import { getStageName } from '../../utils';
import { Navigation } from './Navigation';

interface Props {
	campaignId: number;
	stageId: number;
}

export const CampaignStageNavigation: React.FC<Props> = (props) => {
	const { campaignId, stageId } = props;

	const metadata = useAppSelector(getMetadata);

	const stages = useMemo(() => {
		return metadata.campaigns.flatMap((x) => x.stages);
	}, [metadata]);

	const prev = useMemo<INavigationPath | undefined>(() => {
		const index = stages.findIndex((x) => x.id === stageId);
		const stage = stages[index - 1];
		if (!stage) {
			return;
		}

		const campaign = metadata.campaigns.find((x) => x.stages.some((x) => x.id === stage.id));
		if (!campaign) {
			return;
		}

		return {
			path: `/campaign/${campaign.id}/${stage.id}`,
			name: getStageName(stage.id),
		};
	}, [metadata, stages, campaignId, stageId]);

	const next = useMemo<INavigationPath | undefined>(() => {
		const index = stages.findIndex((x) => x.id === stageId);
		const stage = stages[index + 1];
		if (!stage) {
			return;
		}

		const campaign = metadata.campaigns.find((x) => x.stages.some((x) => x.id === stage.id));
		if (!campaign) {
			return;
		}

		return {
			path: `/campaign/${campaign.id}/${stage.id}`,
			name: getStageName(stage.id),
		};
	}, [metadata, stages, campaignId, stageId]);

	return <Navigation prev={prev} next={next} />;
};

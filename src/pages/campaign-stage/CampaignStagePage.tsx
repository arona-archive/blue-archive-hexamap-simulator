import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getMetadata } from '../../reducers';
import { IHexaMapMetadata } from '../../types';
import { CampaignStageNavigation, Page, Stage } from '../../components';

export const CampaignStagePage: React.FC = () => {
	const params = useParams<{ campaignId: string; stageId: string }>();

	const metadata = useAppSelector(getMetadata);

	const [hexamap, setHexamap] = useState<IHexaMapMetadata | null>(null);

	const campaignId = useMemo(() => {
		if (!params.campaignId) {
			return;
		}
		return parseInt(params.campaignId, 10);
	}, [params.campaignId]);

	const stageId = useMemo(() => {
		if (!params.stageId) {
			return;
		}
		return parseInt(params.stageId, 10);
	}, [params.stageId]);

	const stage = useMemo(() => {
		return metadata.campaigns.flatMap((x) => x.stages).find((x) => x.id === stageId);
	}, [stageId]);

	useEffect(() => {
		if (!stageId) {
			return;
		}
		(async () => {
			const hexamap = await import(`../../_data/hexamaps/${stageId}.json`);
			setHexamap(hexamap);
		})();
	}, [stageId]);

	if (!campaignId || !stageId) {
		return null;
	}

	return (
		<Page
			breadcrumbs={[
				{ name: 'main', path: '/' },
				{ name: campaignId, path: `/campaign/${campaignId}` },
				{ name: stageId, path: `/campaign/${campaignId}/${stageId}` },
			]}
		>
			{stage && (
				<>
					<CampaignStageNavigation campaignId={campaignId} stageId={stageId} />
					{hexamap && <Stage stage={stage} hexamap={hexamap} />}
				</>
			)}
		</Page>
	);
};

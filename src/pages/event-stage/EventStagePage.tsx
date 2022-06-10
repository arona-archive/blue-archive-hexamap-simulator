import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getMetadata } from '../../reducers';
import { IHexaMapMetadata } from '../../types';
import { Page } from '../../components';

export const EventStagePage: React.FC = () => {
	const params = useParams();

	const metadata = useAppSelector(getMetadata);

	const [hexamap, setHexamap] = useState<IHexaMapMetadata | null>(null);

	const stageId = useMemo(() => {
		if (!params.stageId) {
			return;
		}
		return parseInt(params.stageId, 10);
	}, [params.stageId]);

	const stage = useMemo(() => {
		return metadata.events.flatMap((x) => x.stages).find((x) => x.id === stageId);
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

	return (
		<Page title={`event stage / ${stageId}`}>
			<pre>{JSON.stringify(stage, null, 2)}</pre>
			<pre>{JSON.stringify(hexamap, null, 2)}</pre>
		</Page>
	);
};

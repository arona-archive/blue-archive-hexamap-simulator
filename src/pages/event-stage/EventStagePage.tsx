import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EventStageNavigation, Page, Stage } from '../../components';
import { useAppSelector } from '../../hooks';
import { getMetadata } from '../../reducers';
import { IHexaMapMetadata } from '../../types';

export const EventStagePage: React.FC = () => {
	const params = useParams<{ eventId: string; stageId: string }>();

	const metadata = useAppSelector(getMetadata);

	const [hexamap, setHexamap] = useState<IHexaMapMetadata | null>(null);

	const eventId = useMemo(() => {
		if (!params.eventId) {
			return;
		}
		return parseInt(params.eventId, 10);
	}, [params.eventId]);

	const stageId = useMemo(() => {
		if (!params.stageId) {
			return;
		}
		return parseInt(params.stageId, 10);
	}, [params.stageId]);

	const stage = useMemo(() => metadata.events.flatMap((x) => x.stages).find((x) => x.id === stageId), [stageId]);

	useEffect(() => {
		if (!stageId) {
			return;
		}
		(async () => {
			const hexamap = await import(`../../_data/hexamaps/${stageId}.json`);
			setHexamap(hexamap);
		})();
	}, [stageId]);

	if (!eventId || !stage) {
		return null;
	}

	return (
		<Page>
			<EventStageNavigation eventId={eventId} stageId={stage.id} />
			{hexamap && <Stage stage={stage} hexamap={hexamap} />}
		</Page>
	);
};

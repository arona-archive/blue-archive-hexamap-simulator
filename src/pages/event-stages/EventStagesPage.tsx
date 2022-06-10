import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getMetadata } from '../../reducers';
import { Page } from '../../components';
import { EventStageEntry } from './EventStageEntry';

export const EventStagesPage: React.FC = () => {
	const metadata = useAppSelector(getMetadata);

	const params = useParams();

	const eventId = useMemo(() => {
		if (!params.eventId) {
			return;
		}
		return parseInt(params.eventId, 10);
	}, [params.eventId]);

	const event = useMemo(() => {
		return metadata.events.find((x) => x.id === eventId);
	}, [eventId]);

	return (
		<Page title={`event stages / ${eventId}`}>
			<div className="list-group">
				<div className="list-group-item list-group-item-primary">event stages</div>
				{event?.stages.map((x) => (
					<EventStageEntry key={x.id} stageId={x.id} />
				))}
			</div>
		</Page>
	);
};

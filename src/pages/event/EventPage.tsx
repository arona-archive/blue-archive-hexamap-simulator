import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getMetadata } from '../../reducers';
import { EventNavigation, Page } from '../../components';
import { EventStageEntry } from './EventStageEntry';

export const EventPage: React.FC = () => {
	const params = useParams<{ eventId: string }>();

	const metadata = useAppSelector(getMetadata);

	const eventId = useMemo(() => {
		if (!params.eventId) {
			return;
		}
		return parseInt(params.eventId, 10);
	}, [params.eventId]);

	const event = useMemo(() => {
		return metadata.events.find((x) => x.id === eventId);
	}, [eventId]);

	if (!eventId) {
		return null;
	}

	return (
		<Page
			breadcrumbs={[
				{ name: 'main', path: '/' },
				{ name: eventId, path: `/event/${eventId}` },
			]}
		>
			<EventNavigation eventId={eventId} />
			<div className="list-group">
				<div className="list-group-item list-group-item-primary">event stages</div>
				{event?.stages.map((x) => (
					<EventStageEntry key={x.id} eventId={eventId} stageId={x.id} />
				))}
			</div>
		</Page>
	);
};

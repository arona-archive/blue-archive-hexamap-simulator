import React from 'react';
import { useAppSelector } from '../../hooks';
import { getMetadata } from '../../reducers';
import { Page } from '../../components';
import { EventEntry } from './EventEntry';

export const EventsPage: React.FC = () => {
	const metadata = useAppSelector(getMetadata);

	return (
		<Page title="events">
			<div className="list-group">
				<div className="list-group-item list-group-item-primary">events</div>
				{metadata.events.map((event) => (
					<EventEntry key={event.id} event={event} />
				))}
			</div>
		</Page>
	);
};

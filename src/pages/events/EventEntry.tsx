import React from 'react';
import { Link } from 'react-router-dom';
import { IEventMetadata } from '../../types';

interface Props {
	event: IEventMetadata;
}

export const EventEntry: React.FC<Props> = (props) => {
	const { event } = props;

	return (
		<Link className="list-group-item" to={`/event_stages/${event.id}`}>
			{event.id}
		</Link>
	);
};

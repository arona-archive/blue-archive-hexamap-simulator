import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
	eventId: number;
	stageId: number;
}

export const EventStageEntry: React.FC<Props> = (props) => {
	const { eventId, stageId } = props;

	return (
		<Link className="list-group-item" to={`/event/${eventId}/${stageId}`}>
			{stageId}
		</Link>
	);
};

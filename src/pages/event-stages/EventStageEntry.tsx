import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
	stageId: number;
}

export const EventStageEntry: React.FC<Props> = (props) => {
	const { stageId } = props;

	return (
		<Link className="list-group-item" to={`/event_stage/${stageId}`}>
			{stageId}
		</Link>
	);
};

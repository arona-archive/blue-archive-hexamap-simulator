import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks';
import { getStageName } from '../../utils';

interface Props {
	eventId: number;
	stageId: number;
}

export const EventStageEntry: React.FC<Props> = (props) => {
	const { eventId, stageId } = props;

	const stageName = useTranslation(getStageName(stageId));

	return (
		<Link className="list-group-item" to={`/event/${eventId}/${stageId}`}>
			{stageName}
		</Link>
	);
};

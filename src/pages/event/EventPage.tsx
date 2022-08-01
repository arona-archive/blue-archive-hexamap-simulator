import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { EventNavigation, Page } from '../../components';
import { DifficultyType, LocalizationTextKey, LocalizationTextTable } from '../../constants';
import { useAppSelector } from '../../hooks';
import { getMetadata } from '../../reducers';
import { getEventName } from '../../utils';
import { EventStageEntry } from './EventStageEntry';

const ListHeader = styled.div`
	user-select: none;
`;

export const EventPage: React.FC = () => {
	const params = useParams<{ eventId: string }>();

	const metadata = useAppSelector(getMetadata);

	const eventId = useMemo(() => {
		if (!params.eventId) {
			return;
		}
		return parseInt(params.eventId, 10);
	}, [params.eventId]);

	const event = useMemo(() => metadata.events.find((x) => x.id === eventId), [eventId]);

	const questStages = useMemo(() => {
		if (!event?.stages) {
			return [];
		}
		return event.stages.filter((x) => x.difficultyType === DifficultyType.HARD);
	}, [event?.stages]);

	const challengeStages = useMemo(() => {
		if (!event?.stages) {
			return [];
		}
		return event.stages.filter((x) => x.difficultyType === DifficultyType.CHALLENGE);
	}, [event?.stages]);

	if (!event) {
		return null;
	}

	return (
		<Page
			breadcrumbs={[
				{ name: LocalizationTextTable[LocalizationTextKey.HOME], path: '/' },
				{ name: getEventName(event.id), path: `/event/${event.id}` },
			]}
		>
			<EventNavigation eventId={event.id} />
			{questStages.length > 0 && (
				<div className="list-group">
					<ListHeader className="list-group-item list-group-item-primary">Quest</ListHeader>
					{questStages.map((stage) => (
						<EventStageEntry key={stage.id} eventId={event.id} stageId={stage.id} />
					))}
				</div>
			)}
			{challengeStages.length > 0 && (
				<div className="list-group">
					<ListHeader className="list-group-item list-group-item-primary">Challenge</ListHeader>
					{challengeStages.map((stage) => (
						<EventStageEntry key={stage.id} eventId={event.id} stageId={stage.id} />
					))}
				</div>
			)}
		</Page>
	);
};

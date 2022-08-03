import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { EventNavigation, List, Page } from '../../components';
import { DifficultyType, LocalizationKey } from '../../constants';
import { useAppSelector } from '../../hooks';
import { getMetadata } from '../../reducers';
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
		<Page>
			<EventNavigation eventId={event.id} />
			{questStages.length > 0 && (
				<List titleKey={LocalizationKey.QUEST}>
					{questStages.map((stage) => (
						<EventStageEntry key={stage.id} eventId={event.id} stageId={stage.id} />
					))}
				</List>
			)}
			{challengeStages.length > 0 && (
				<List titleKey={LocalizationKey.CHALLENGE}>
					{challengeStages.map((stage) => (
						<EventStageEntry key={stage.id} eventId={event.id} stageId={stage.id} />
					))}
				</List>
			)}
		</Page>
	);
};

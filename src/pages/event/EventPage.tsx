import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EventNavigation, List, Page } from '../../components';
import { DifficultyType, LocalizationKey } from '../../constants';
import { useAppSelector } from '../../hooks';
import { getMetadata } from '../../reducers';
import { DatabaseService } from '../../services';
import { IStageStars } from '../../types';
import { EventStageEntry } from './EventStageEntry';

export const EventPage: React.FC = () => {
	const [stageStars, setStageStars] = useState<{ stageId: number; stars: IStageStars }[]>([]);

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
		return event.stages
			.filter((x) => x.difficultyType === DifficultyType.HARD)
			.map((stage) => {
				const stars = stageStars.find((x) => x.stageId === stage.id);
				return { stage, stars: stars?.stars };
			});
	}, [event?.stages]);

	const challengeStages = useMemo(() => {
		if (!event?.stages) {
			return [];
		}
		return event.stages
			.filter((x) => x.difficultyType === DifficultyType.CHALLENGE)
			.map((stage) => {
				const stars = stageStars.find((x) => x.stageId === stage.id);
				return { stage, stars: stars?.stars };
			});
	}, [event?.stages]);

	useEffect(() => {
		(async () => {
			const service = new DatabaseService();
			const solutions = await service.getStageSolutions();
			if (!solutions) {
				return;
			}

			const stageStars = solutions.map((solution) => ({ stageId: solution.stageId, stars: solution.stars }));
			setStageStars(stageStars);
		})();
	}, [eventId]);

	if (!event) {
		return null;
	}

	return (
		<Page>
			<EventNavigation eventId={event.id} />
			{questStages.length > 0 && (
				<List titleKey={LocalizationKey.QUEST}>
					{questStages.map(({ stage, stars }) => (
						<EventStageEntry key={stage.id} eventId={event.id} stageId={stage.id} stars={stars} />
					))}
				</List>
			)}
			{challengeStages.length > 0 && (
				<List titleKey={LocalizationKey.CHALLENGE}>
					{challengeStages.map(({ stage, stars }) => (
						<EventStageEntry key={stage.id} eventId={event.id} stageId={stage.id} stars={stars} />
					))}
				</List>
			)}
		</Page>
	);
};

import React, { useMemo } from 'react';
import { useAppSelector } from '../../hooks';
import { getMetadata } from '../../reducers';
import { INavigationPath } from '../../types';
import { getStageName } from '../../utils';
import { Navigation } from './Navigation';

interface Props {
	eventId: number;
	stageId: number;
}

export const EventStageNavigation: React.FC<Props> = (props) => {
	const { eventId, stageId } = props;

	const metadata = useAppSelector(getMetadata);

	const stages = useMemo(() => {
		return metadata.events.flatMap((x) => x.stages);
	}, [metadata]);

	const prev = useMemo<INavigationPath | undefined>(() => {
		const index = stages.findIndex((x) => x.id === stageId);
		const stage = stages[index - 1];
		if (!stage) {
			return;
		}

		const event = metadata.events.find((x) => x.stages.some((x) => x.id === stage.id));
		if (!event) {
			return;
		}

		return {
			path: `/event/${event.id}/${stage.id}`,
			name: getStageName(stage.id),
		};
	}, [metadata, stages, eventId, stageId]);

	const next = useMemo<INavigationPath | undefined>(() => {
		const index = stages.findIndex((x) => x.id === stageId);
		const stage = stages[index + 1];
		if (!stage) {
			return;
		}

		const event = metadata.events.find((x) => x.stages.some((x) => x.id === stage.id));
		if (!event) {
			return;
		}

		return {
			path: `/event/${event.id}/${stage.id}`,
			name: getStageName(stage.id),
		};
	}, [metadata, stages, eventId, stageId]);

	return <Navigation prev={prev} next={next} />;
};

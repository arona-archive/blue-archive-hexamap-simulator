import React, { useMemo } from 'react';
import { useAppSelector } from '../../hooks';
import { getMetadata } from '../../reducers';
import { INavigationPath } from '../../types';
import { getEventName } from '../../utils';
import { Navigation } from './Navigation';

interface Props {
	eventId: number;
}

export const EventNavigation: React.FC<Props> = (props) => {
	const { eventId } = props;

	const metadata = useAppSelector(getMetadata);

	const prev = useMemo<INavigationPath | undefined>(() => {
		const index = metadata.events.findIndex((x) => x.id === eventId);
		const event = metadata.events[index - 1];
		if (!event) {
			return;
		}

		return {
			path: `/event/${event.id}`,
			name: getEventName(event.id),
		};
	}, [eventId]);

	const next = useMemo<INavigationPath | undefined>(() => {
		const index = metadata.events.findIndex((x) => x.id === eventId);
		const event = metadata.events[index + 1];
		if (!event) {
			return;
		}

		return {
			path: `/event/${event.id}`,
			name: getEventName(event.id),
		};
	}, [eventId]);

	return <Navigation prev={prev} next={next} />;
};

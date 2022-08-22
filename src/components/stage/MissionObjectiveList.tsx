import React from 'react';
import { LocalizationKey } from '../../constants';
import { useTranslation } from '../../hooks';
import { IStageStarConditionsMetadata } from '../../types';
import { List } from '../list';
import { MissionObjectiveListEntry } from './MissionObjectiveListEntry';

interface Props {
	currentPhase: number;
	battleCount: number;
	cleared: boolean;
	starConditions: IStageStarConditionsMetadata;
}

export const MissionObjectiveList: React.FC<Props> = (props) => {
	const { currentPhase, battleCount, cleared, starConditions } = props;

	const labelA = useTranslation(LocalizationKey.MISSION_COMPLETE);
	const labelB = useTranslation(LocalizationKey.MISSION_S_RANK_COUNT);
	const labelC = useTranslation(LocalizationKey.MISSION_TURN_COUNT);

	return (
		<List titleKey={LocalizationKey.MISSION_OBJECTIVES}>
			<MissionObjectiveListEntry hidden={!cleared} label={labelA} />
			<MissionObjectiveListEntry hidden={battleCount < starConditions.rank} label={labelB} />
			<MissionObjectiveListEntry hidden={currentPhase > starConditions.phase} label={labelC} />
		</List>
	);
};

import React, { useMemo } from 'react';
import { StageActionType } from '../../constants';
import { useAppSelector } from '../../hooks';
import { getCleared, getCurrentPhase, getStageActions } from '../../reducers';
import { IStageMetadata } from '../../types';
import { MissionObjectiveList } from './MissionObjectiveList';
import { ShareButton } from './ShareButton';
import { StateTypeButton } from './StateTypeButton';

interface Props {
	stage: IStageMetadata;
}

export const StageMenu: React.FC<Props> = (props) => {
	const { stage } = props;

	const currentPhase = useAppSelector(getCurrentPhase);
	const stageActions = useAppSelector(getStageActions);
	const cleared = useAppSelector(getCleared);

	const battleCount = useMemo(
		() => stageActions.filter((x) => x.type === StageActionType.BATTLE).length,
		[stageActions]
	);

	return (
		<>
			<MissionObjectiveList
				currentPhase={currentPhase}
				battleCount={battleCount}
				cleared={cleared}
				starConditions={stage.starConditions}
			/>
			<ShareButton />
			<StateTypeButton disabled={!cleared} />
		</>
	);
};

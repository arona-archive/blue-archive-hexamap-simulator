import React, { useMemo } from 'react';
import { AttackType, StageActionType } from '../../constants';
import { useAppSelector } from '../../hooks';
import { getActivePlayerUnit, getCleared, getCurrentPhase, getStageActions } from '../../reducers';
import { IStageMetadata } from '../../types';
import { MissionObjectiveList } from './MissionObjectiveList';
import { PlayerUnitAttackTypeSelect } from './PlayerUnitAttackTypeSelect';
import { ShareButton } from './ShareButton';
import { StateTypeButton } from './StateTypeButton';

interface Props {
	stage: IStageMetadata;
	attackType: AttackType;
	onChangeAttackType: (attackType: AttackType) => void;
}

export const StageMenu: React.FC<Props> = (props) => {
	const { stage, attackType, onChangeAttackType } = props;

	const currentPhase = useAppSelector(getCurrentPhase);
	const stageActions = useAppSelector(getStageActions);
	const cleared = useAppSelector(getCleared);
	const activePlayerUnit = useAppSelector(getActivePlayerUnit);

	const battleCount = useMemo(
		() => stageActions.filter((x) => x.type === StageActionType.BATTLE).length,
		[stageActions]
	);

	const isPlayerUnitAttackTypeMutable = useMemo(() => {
		return !!activePlayerUnit && currentPhase === 0;
	}, [activePlayerUnit, currentPhase]);

	return (
		<>
			<MissionObjectiveList
				currentPhase={currentPhase}
				battleCount={battleCount}
				cleared={cleared}
				starConditions={stage.starConditions}
			/>
			{isPlayerUnitAttackTypeMutable && (
				<PlayerUnitAttackTypeSelect attackType={attackType} onChange={onChangeAttackType} />
			)}
			<ShareButton />
			<StateTypeButton disabled={!cleared} />
		</>
	);
};

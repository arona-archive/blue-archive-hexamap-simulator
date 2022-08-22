import React, { useMemo } from 'react';
import { AttackType, StageActionType } from '../../constants';
import { useAppSelector } from '../../hooks';
import {
	getActivePlayerUnit,
	getCleared,
	getCurrentPhase,
	getEnemyUnits,
	getPlayerUnits,
	getStageActions,
	getTileEvents,
} from '../../reducers';
import { IStageMetadata } from '../../types';
import { getIsWrapTriggerable } from '../../utils';
import { MissionObjectiveList } from './MissionObjectiveList';
import { PlayerUnitAttackTypeSelect } from './PlayerUnitAttackTypeSelect';
import { PlayerUnitTriggerWrapButton } from './PlayerUnitTriggerWrapButton';
import { ShareButton } from './ShareButton';
import { StateTypeButton } from './StateTypeButton';

interface Props {
	stage: IStageMetadata;
	attackType: AttackType;
	onChangeAttackType: (attackType: AttackType) => void;
	onClickTriggerWrap: () => void;
}

export const StageMenu: React.FC<Props> = (props) => {
	const { stage, attackType, onChangeAttackType, onClickTriggerWrap } = props;

	const currentPhase = useAppSelector(getCurrentPhase);
	const playerUnits = useAppSelector(getPlayerUnits);
	const enemyUnits = useAppSelector(getEnemyUnits);
	const tileEvents = useAppSelector(getTileEvents);
	const stageActions = useAppSelector(getStageActions);
	const cleared = useAppSelector(getCleared);
	const activePlayerUnit = useAppSelector(getActivePlayerUnit);

	const battleCount = useMemo(() => {
		return stageActions.filter((x) => x.type === StageActionType.BATTLE).length;
	}, [stageActions]);

	const isPlayerUnitAttackTypeMutable = useMemo(() => {
		return !!activePlayerUnit && currentPhase === 0;
	}, [activePlayerUnit, currentPhase]);

	const isWrapTriggable = useMemo(() => {
		if (!activePlayerUnit) {
			return false;
		}
		return getIsWrapTriggerable(activePlayerUnit, playerUnits, enemyUnits, tileEvents);
	}, [activePlayerUnit, playerUnits, enemyUnits, tileEvents]);

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
			{isWrapTriggable && <PlayerUnitTriggerWrapButton onClick={onClickTriggerWrap} />}
			<ShareButton />
			<StateTypeButton disabled={!cleared} />
		</>
	);
};

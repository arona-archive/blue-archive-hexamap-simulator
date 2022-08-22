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
	currentPhase: number;
	attackType: AttackType;
	battleCount: number;
	onChangeAttackType: (attackType: AttackType) => void;
	onClickTriggerWrap: () => void;
}

export const StageMenu: React.FC<Props> = (props) => {
	const { stage, currentPhase, attackType, battleCount, onChangeAttackType, onClickTriggerWrap } = props;

	const playerUnits = useAppSelector(getPlayerUnits);
	const enemyUnits = useAppSelector(getEnemyUnits);
	const tileEvents = useAppSelector(getTileEvents);
	const cleared = useAppSelector(getCleared);
	const activePlayerUnit = useAppSelector(getActivePlayerUnit);

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

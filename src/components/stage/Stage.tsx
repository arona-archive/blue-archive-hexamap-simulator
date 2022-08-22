import { getEnumValue } from '@sapphire-sh/utils';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { AttackType, LocalizationKey, StageActionType } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
	addPlayerUnit,
	getActivePlayerUnit,
	getCleared,
	getCurrentPhase,
	getEnemyUnits,
	getItemUnits,
	getPlayerUnits,
	getStageActions,
	getTileEvents,
	getTiles,
	initialize,
	movePlayerUnit,
	nextPhase,
	prevAction,
	prevPhase,
	setHexamap,
	triggerWrap,
	updatePlayerUnit,
} from '../../reducers';
import { IHexaMapMetadata, IStageMetadata } from '../../types';
import { getIsWrapTriggerable } from '../../utils';
import { HexaMap } from '../hexa-map';
import { List } from '../list';
import { MissionObjectiveList } from './MissionObjectiveList';

const HexamapWrapper = styled.div`
	padding: 48px 24px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

interface Props {
	stage: IStageMetadata;
	hexamap: IHexaMapMetadata;
}

export const Stage: React.FC<Props> = (props) => {
	const { stage, hexamap } = props;

	const [attackType, setAttackType] = useState(AttackType.EXPLOSIVE);

	const activePlayerUnit = useAppSelector(getActivePlayerUnit);

	const currentPhase = useAppSelector(getCurrentPhase);
	const tiles = useAppSelector(getTiles);
	const playerUnits = useAppSelector(getPlayerUnits);
	const enemyUnits = useAppSelector(getEnemyUnits);
	const itemUnits = useAppSelector(getItemUnits);
	const tileEvents = useAppSelector(getTileEvents);
	const stageActions = useAppSelector(getStageActions);
	const cleared = useAppSelector(getCleared);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(initialize());
		dispatch(setHexamap(hexamap));
	}, [hexamap]);

	useEffect(() => {
		if (!activePlayerUnit) {
			return;
		}
		if (activePlayerUnit.attackType === attackType) {
			return;
		}

		setAttackType(activePlayerUnit.attackType);
	}, [activePlayerUnit]);

	const isPlayerUnitAttackTypeMutable = useMemo(() => {
		return !!activePlayerUnit && currentPhase === 0;
	}, [activePlayerUnit, currentPhase]);

	const isWrapTriggable = useMemo(() => {
		if (!activePlayerUnit) {
			return false;
		}
		return getIsWrapTriggerable(activePlayerUnit, playerUnits, enemyUnits, tileEvents);
	}, [activePlayerUnit, playerUnits, enemyUnits, tileEvents]);

	const isPrevPhaseButtonDisabled = useMemo(() => {
		return currentPhase === 0;
	}, [currentPhase]);

	const isNextPhaseButtonDisabled = useMemo(() => {
		return playerUnits.length === 0 || cleared;
	}, [playerUnits.length, cleared]);

	const isPrevActionButtonDisabled = useMemo(() => {
		return stageActions.length === 0;
	}, [stageActions.length]);

	const battleCount = useMemo(
		() => stageActions.filter((x) => x.type === StageActionType.BATTLE).length,
		[stageActions]
	);

	const handleChangeAttackType = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			const attackType = getEnumValue(AttackType)(event.target.value);
			if (!attackType) {
				return;
			}

			setAttackType(attackType);

			if (!activePlayerUnit) {
				return;
			}
			if (activePlayerUnit.attackType === attackType) {
				return;
			}

			dispatch(
				updatePlayerUnit({
					id: activePlayerUnit.id,
					attackType,
				})
			);
		},
		[activePlayerUnit]
	);

	const handleClickTile = useCallback(
		(tileId: number) => {
			const tile = tiles.find((x) => x.id === tileId);
			if (!tile) {
				return;
			}

			if (currentPhase === 0) {
				dispatch(
					addPlayerUnit({
						attackType,
						position: tile.position,
					})
				);

				return;
			}

			if (!activePlayerUnit) {
				return;
			}

			dispatch(
				movePlayerUnit({
					id: activePlayerUnit.id,
					position: tile.position,
				})
			);
		},
		[activePlayerUnit, currentPhase, tiles]
	);

	const handleClickPrevPhase = useCallback(() => {
		dispatch(prevPhase());
	}, []);

	const handleClickNextPhase = useCallback(() => {
		dispatch(nextPhase());
	}, []);

	const handleClickPrevAction = useCallback(() => {
		dispatch(prevAction());
	}, []);

	const handleClickTriggerWrap = useCallback(() => {
		if (!activePlayerUnit) {
			return;
		}
		dispatch(triggerWrap(activePlayerUnit.id));
	}, [activePlayerUnit]);

	return (
		<>
			<div className="row">
				<HexamapWrapper className="col-9">
					<HexaMap
						tiles={tiles}
						playerUnits={playerUnits}
						enemyUnits={enemyUnits}
						itemUnits={itemUnits}
						tileEvents={tileEvents}
						onClickTile={handleClickTile}
					/>
				</HexamapWrapper>
				<div className="col-3">
					<MissionObjectiveList
						currentPhase={currentPhase}
						battleCount={battleCount}
						cleared={cleared}
						starConditions={stage.starConditions}
					/>
				</div>
			</div>
			{isPlayerUnitAttackTypeMutable && (
				<div className="row">
					<div className="col">
						<form className="form-inline">
							<div className="form-group">
								<label htmlFor="attack_type">attack type</label>
								<select
									className="form-control"
									name="attack_type"
									value={attackType}
									onChange={handleChangeAttackType}
								>
									{Object.values(AttackType).map((x) => (
										<option key={x} value={x}>
											{x}
										</option>
									))}
								</select>
							</div>
						</form>
					</div>
				</div>
			)}
			<div className="row">
				<div className="col-12">{`current phase=${currentPhase}`}</div>
				<div className="col-12 btn-group">
					<button
						type="button"
						className="btn btn-primary"
						disabled={isPrevPhaseButtonDisabled}
						onClick={handleClickPrevPhase}
					>
						prev phase
					</button>
					<button
						type="button"
						className="btn btn-primary"
						disabled={isNextPhaseButtonDisabled}
						onClick={handleClickNextPhase}
					>
						next phase
					</button>
					<button
						type="button"
						className="btn btn-primary"
						disabled={isPrevActionButtonDisabled}
						onClick={handleClickPrevAction}
					>
						undo
					</button>
				</div>
			</div>
			{isWrapTriggable && (
				<div className="row">
					<div className="col-12">
						<div className="form-inline">
							<div className="form-group">
								<button className="form-control" onClick={handleClickTriggerWrap}>
									trigger warp
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
			<List titleKey={LocalizationKey.STAGE_ACTIONS}>
				{stageActions.map((x, i) => (
					<div key={i} className="list-group-item">
						<pre>{JSON.stringify(x, null, 2)}</pre>
					</div>
				))}
			</List>
		</>
	);
};

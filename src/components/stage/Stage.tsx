import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { AttackType, TILE_SIZE } from '../../constants';
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
	prevPhase,
	setHexamap,
	triggerWrap,
	updatePlayerUnit,
	prevAction,
} from '../../reducers';
import { IHexaMapMetadata, IStageMetadata } from '../../types';
import { getEnumValue, GetIsWrapTriggerable } from '../../utils';
import { HexaMap } from '../hexa-map';

const HexamapWrapper = styled.div`
	padding: ${TILE_SIZE}px;
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
		return GetIsWrapTriggerable(activePlayerUnit, playerUnits, enemyUnits, tileEvents);
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
				<HexamapWrapper className="col">
					<HexaMap
						tiles={tiles}
						playerUnits={playerUnits}
						enemyUnits={enemyUnits}
						itemUnits={itemUnits}
						tileEvents={tileEvents}
						onClickTile={handleClickTile}
					/>
				</HexamapWrapper>
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
			<div className="list-group">
				<div className="list-group-item list-group-item-primary">stage actions</div>
				{stageActions.map((x, i) => (
					<div key={i} className="list-group-item">
						<pre>{JSON.stringify(x, null, 2)}</pre>
					</div>
				))}
			</div>
		</>
	);
};

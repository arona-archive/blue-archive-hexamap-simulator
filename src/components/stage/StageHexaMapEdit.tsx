import { getEnumValue } from '@sapphire-sh/utils';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { AttackType } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
	addPlayerUnit,
	getActivePlayerUnit,
	getCurrentPhase,
	getEnemyUnits,
	getItemUnits,
	getPlayerUnits,
	getTileEvents,
	getTiles,
	movePlayerUnit,
	updatePlayerUnit,
} from '../../reducers';
import { HexaMap } from '../hexa-map';

const Root = styled.div``;

export const StageHexaMapEdit: React.FC = () => {
	const [attackType, setAttackType] = useState(AttackType.EXPLOSIVE);

	const currentPhase = useAppSelector(getCurrentPhase);
	const tiles = useAppSelector(getTiles);
	const playerUnits = useAppSelector(getPlayerUnits);
	const enemyUnits = useAppSelector(getEnemyUnits);
	const itemUnits = useAppSelector(getItemUnits);
	const tileEvents = useAppSelector(getTileEvents);
	const activePlayerUnit = useAppSelector(getActivePlayerUnit);

	const dispatch = useAppDispatch();

	const isPlayerUnitAttackTypeMutable = useMemo(() => {
		return !!activePlayerUnit && currentPhase === 0;
	}, [activePlayerUnit, currentPhase]);

	useEffect(() => {
		if (!activePlayerUnit) {
			return;
		}
		if (activePlayerUnit.attackType === attackType) {
			return;
		}

		setAttackType(activePlayerUnit.attackType);
	}, [activePlayerUnit]);

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

	return (
		<Root>
			<HexaMap
				tiles={tiles}
				playerUnits={playerUnits}
				enemyUnits={enemyUnits}
				itemUnits={itemUnits}
				tileEvents={tileEvents}
				onClickTile={handleClickTile}
			/>
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
		</Root>
	);
};

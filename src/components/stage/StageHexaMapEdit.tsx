import React, { useCallback } from 'react';
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
} from '../../reducers';
import { HexaMap } from '../hexa-map';

interface Props {
	attackType: AttackType;
}

export const StageHexaMapEdit: React.FC<Props> = (props) => {
	const { attackType } = props;

	const currentPhase = useAppSelector(getCurrentPhase);
	const tiles = useAppSelector(getTiles);
	const playerUnits = useAppSelector(getPlayerUnits);
	const enemyUnits = useAppSelector(getEnemyUnits);
	const itemUnits = useAppSelector(getItemUnits);
	const tileEvents = useAppSelector(getTileEvents);
	const activePlayerUnit = useAppSelector(getActivePlayerUnit);

	const dispatch = useAppDispatch();

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

	return (
		<HexaMap
			tiles={tiles}
			playerUnits={playerUnits}
			enemyUnits={enemyUnits}
			itemUnits={itemUnits}
			tileEvents={tileEvents}
			onClickTile={handleClickTile}
		/>
	);
};

import React, { useMemo } from 'react';
import styled from 'styled-components';
import { StateType, TILE_SIZE } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deselectTile, getActiveTile, selectTile } from '../../reducers';
import { IEnemyUnit, IItemUnit, IPlayerUnit, IStageAction, ITile, ITileEvent } from '../../types';
import {
	findActiveEnemyUnit,
	findActiveItemUnit,
	findActivePlayerUnit,
	findActiveTileEvent,
	isUnitPositionEquals,
} from '../../utils';
import { HexaMapTile } from './HexaMapTile';

const Root = styled.div<{
	width: number;
	height: number;
}>`
	position: relative;
	width: ${(props) => TILE_SIZE * props.width}px;
	height: ${(props) => TILE_SIZE * props.height}px;
`;

interface Props {
	stateType: StateType;
	tiles: ITile[];
	playerUnits: IPlayerUnit[];
	enemyUnits: IEnemyUnit[];
	itemUnits: IItemUnit[];
	tileEvents: ITileEvent[];
	nextReplayStageAction?: IStageAction;
	onClickTile: (tileId: number) => void;
}

export const HexaMap: React.FC<Props> = (props) => {
	const { stateType, tiles, playerUnits, enemyUnits, itemUnits, tileEvents, nextReplayStageAction, onClickTile } =
		props;

	const activeTile = useAppSelector(getActiveTile);

	const dispatch = useAppDispatch();

	const { width, height } = useMemo(() => {
		const p = tiles.map((x) => x.tilePosition[0]);
		const q = tiles.map((x) => x.tilePosition[1]);

		const minX = Math.min(...p);
		const maxX = Math.max(...p);
		const minY = Math.min(...q);
		const maxY = Math.max(...q);

		return {
			width: maxX - minX + 1,
			height: maxY - minY + 1,
		};
	}, [tiles]);

	const handleClickTile = (tileId: number) => {
		return () => {
			if (activeTile?.id === tileId) {
				dispatch(deselectTile());
			} else {
				dispatch(selectTile(tileId));
			}
			onClickTile(tileId);
		};
	};

	return (
		<Root width={width} height={height}>
			{tiles.map((tile) => {
				const active = activeTile?.id === tile.id;

				const playerUnit = findActivePlayerUnit(playerUnits, isUnitPositionEquals(tile.position));
				const enemyUnit = findActiveEnemyUnit(enemyUnits, isUnitPositionEquals(tile.position));
				const itemUnit = findActiveItemUnit(itemUnits, isUnitPositionEquals(tile.position));
				const tileEvent = findActiveTileEvent(tileEvents, isUnitPositionEquals(tile.position));

				return (
					<HexaMapTile
						key={tile.id}
						stateType={stateType}
						active={active}
						tile={tile}
						playerUnit={playerUnit}
						enemyUnit={enemyUnit}
						itemUnit={itemUnit}
						tileEvent={tileEvent}
						nextReplayStageAction={nextReplayStageAction}
						onClick={handleClickTile(tile.id)}
					/>
				);
			})}
		</Root>
	);
};

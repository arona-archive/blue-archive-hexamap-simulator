import React, { useMemo } from 'react';
import styled from 'styled-components';
import { TILE_SIZE } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deselectTile, getActiveTile, selectTile } from '../../reducers';
import { IEnemyUnit, IItemUnit, ITile } from '../../types';
import { findActiveEnemyUnit, findActiveItemUnit, isUnitPositionEquals } from '../../utils';
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
	tiles: ITile[];
	enemyUnits: IEnemyUnit[];
	itemUnits: IItemUnit[];
}

export const HexaMap: React.FC<Props> = (props) => {
	const { tiles, enemyUnits, itemUnits } = props;

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

	const handleClickTile = (id: number) => {
		return () => {
			if (activeTile?.id === id) {
				dispatch(deselectTile());
			} else {
				dispatch(selectTile(id));
			}
		};
	};

	return (
		<Root width={width} height={height}>
			{tiles.map((tile) => {
				const active = activeTile?.id === tile.id;

				const enemyUnit = findActiveEnemyUnit(enemyUnits, isUnitPositionEquals(tile.position));
				const itemUnit = findActiveItemUnit(itemUnits, isUnitPositionEquals(tile.position));

				return (
					<HexaMapTile
						key={tile.id}
						active={active}
						tile={tile}
						enemyUnit={enemyUnit}
						itemUnit={itemUnit}
						onClick={handleClickTile(tile.id)}
					/>
				);
			})}
		</Root>
	);
};

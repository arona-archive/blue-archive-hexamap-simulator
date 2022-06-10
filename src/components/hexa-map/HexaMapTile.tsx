import React from 'react';
import styled from 'styled-components';
import { TILE_SIZE } from '../../constants';
import { Hexagon } from './Hexagon';
import { IEnemyUnit, IItemUnit, IPlayerUnit, ITile, ITileEvent } from '../../types';
import { EnemyUnit, ItemUnit, PlayerUnit, TileEvent } from './units';

const Root = styled.div<{ x: number; y: number }>`
	position: absolute;
	top: ${(props) => props.y * TILE_SIZE}px;
	left: ${(props) => props.x * TILE_SIZE}px;
	width: ${TILE_SIZE}px;
	height: ${TILE_SIZE}px;
	display: flex;
	align-items: center;
`;

const HexagonWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Content = styled.div`
	position: absolute;
	padding: 4px;
	width: 100%;
	height: ${TILE_SIZE / Math.sqrt(3)}px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 12px;
	overflow-x: hidden;
	word-break: break-word;
	pointer-events: none;
	user-select: none;
`;

interface Props {
	active?: boolean;
	tile: ITile;
	playerUnit?: IPlayerUnit;
	enemyUnit?: IEnemyUnit;
	itemUnit?: IItemUnit;
	tileEvent?: ITileEvent;
	onClick?: () => void;
}

export const HexaMapTile: React.FC<Props> = (props) => {
	const { active, tile, playerUnit, enemyUnit, itemUnit, tileEvent, onClick } = props;

	return (
		<Root x={tile.tilePosition[0]} y={tile.tilePosition[1]}>
			<HexagonWrapper>
				<Hexagon
					active={active}
					clickable={true}
					hidden={tile.hidden}
					size={TILE_SIZE * 0.95}
					strokeColor="var(--bs-gray-dark)"
					fillColor="#ffffff"
					onClick={onClick}
				/>
				{tileEvent && <TileEvent tileEvent={tileEvent} />}
				{itemUnit && <ItemUnit itemUnit={itemUnit} />}
				{enemyUnit && <EnemyUnit enemyUnit={enemyUnit} />}
				{playerUnit && <PlayerUnit playerUnit={playerUnit} />}
			</HexagonWrapper>
			<Content>
				<p>{`id=${tile.id}`}</p>
				<p>{`x=${tile.position[0]} y=${tile.position[1]}`}</p>
			</Content>
		</Root>
	);
};

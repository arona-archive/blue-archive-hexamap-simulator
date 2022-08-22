import React, { useMemo } from 'react';
import styled from 'styled-components';
import { StageActionType, StateType, TILE_SIZE } from '../../constants';
import { useAppSelector } from '../../hooks';
import { getDebugFlag } from '../../reducers';
import { IDirection, IEnemyUnit, IItemUnit, IPlayerUnit, IStageAction, ITile, ITileEvent } from '../../types';
import { getNextPosition, isPositionEquals } from '../../utils';
import { Hexagon } from './Hexagon';
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

const ArrowWrapper = styled.div<{ angle: number }>`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 100;
	transform: ${(props) => `rotate(${props.angle}deg)`};
	pointer-events: none;
`;

const Arrow = styled.div<{ color: string }>`
	position: absolute;
	top: -1px;
	right: ${-TILE_SIZE / 2 - 4}px;
	width: ${TILE_SIZE}px;
	height: ${TILE_SIZE}px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 48px;
	color: ${(props) => props.color};
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
	stateType: StateType;
	active?: boolean;
	tile: ITile;
	playerUnit?: IPlayerUnit;
	enemyUnit?: IEnemyUnit;
	itemUnit?: IItemUnit;
	tileEvent?: ITileEvent;
	nextReplayStageAction?: IStageAction;
	onClick?: () => void;
}

export const HexaMapTile: React.FC<Props> = (props) => {
	const { stateType, active, tile, playerUnit, enemyUnit, itemUnit, tileEvent, nextReplayStageAction, onClick } = props;

	const debugFlag = useAppSelector(getDebugFlag);

	const playerUnitNextDirections = useMemo<IDirection[]>(() => {
		if (!playerUnit) {
			return [];
		}
		switch (stateType) {
			case StateType.EDIT: {
				if (!playerUnit.movable) {
					return [];
				}
				return playerUnit.nextDirections;
			}
			case StateType.REPLAY: {
				if (nextReplayStageAction?.type !== StageActionType.MOVE_PLAYER_UNIT) {
					return [];
				}
				return playerUnit.nextDirections.filter((direction) => {
					const nextPosition = getNextPosition(playerUnit.position, direction);
					return isPositionEquals(nextPosition, nextReplayStageAction.nextPosition);
				});
			}
		}
	}, [playerUnit]);

	const enemyUnitNextDirection = useMemo(() => {
		if (!enemyUnit) {
			return;
		}
		return enemyUnit.nextDirection;
	}, [enemyUnit]);

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
			{playerUnitNextDirections.map((x) => (
				<ArrowWrapper key={x.angle} angle={x.angle}>
					<Arrow color="var(--bs-blue)">
						<p>{'→'}</p>
					</Arrow>
				</ArrowWrapper>
			))}
			{enemyUnitNextDirection && (
				<ArrowWrapper angle={enemyUnitNextDirection.angle}>
					<Arrow color="var(--bs-red)">
						<p>{'→'}</p>
					</Arrow>
				</ArrowWrapper>
			)}
			{debugFlag && (
				<Content>
					<p>{`id=${tile.id}`}</p>
					<p>{`x=${tile.position[0]} y=${tile.position[1]}`}</p>
				</Content>
			)}
		</Root>
	);
};

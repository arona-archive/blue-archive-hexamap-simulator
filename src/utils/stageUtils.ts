import { TileEventType } from '../constants';
import {
	ITile,
	IPosition,
	ITileMetadata,
	IEnemyUnitMetadata,
	IEnemyUnit,
	IItemMetadata,
	IItemUnit,
	ITileEventMetadata,
	ITileEvent,
	IPlayerUnit,
} from '../types';
import { isUnitPositionEquals } from './tileUtils';

export const createTiles = (tilesMetadata: ITileMetadata[]): ITile[] => {
	const minX = Math.min(...tilesMetadata.map((x) => x.position[0]));
	const minY = Math.min(...tilesMetadata.map((x) => x.position[1]));

	const tiles: ITile[] = [];

	for (const tileMetadata of tilesMetadata) {
		const [x, y] = tileMetadata.position;
		const indexX = x - minX;
		const indexY = y - minY;
		const posY = indexY + indexX;
		const posX = indexX;

		const tilePosition: IPosition = [posX, posY];

		tiles.push({ id: tileMetadata.id, position: tileMetadata.position, tilePosition, hidden: false });
	}

	for (const tile of tiles) {
		tile.tilePosition[0] = tile.tilePosition[0] - tile.tilePosition[1] * 0.5;
		tile.tilePosition[1] = -tile.tilePosition[1];
	}
	const offsetX = Math.min(...tiles.map((x) => x.tilePosition[0]));
	const offsetY = Math.min(...tiles.map((x) => x.tilePosition[1]));

	for (const tile of tiles) {
		tile.tilePosition[0] = tile.tilePosition[0] - offsetX;
		tile.tilePosition[1] = tile.tilePosition[1] - offsetY;
	}
	const p = 1 / 2 / Math.sqrt(3);
	const q = p * 3;
	for (const tile of tiles) {
		tile.tilePosition[1] = tile.tilePosition[1] - (1 - q) * tile.tilePosition[1];
	}

	return tiles;
};

export const createEnemyUnits = (enemyUnitsMetadata: IEnemyUnitMetadata[]): IEnemyUnit[] => {
	const enemyUnits: IEnemyUnit[] = [];

	for (const enemyUnitMetadata of enemyUnitsMetadata) {
		enemyUnits.push({
			id: enemyUnitMetadata.id,
			rank: enemyUnitMetadata.enemyRank,
			defenceType: enemyUnitMetadata.defenceType,
			movementType: enemyUnitMetadata.movementType,
			position: enemyUnitMetadata.position,
			defeated: false,
			hidden: false,
		});
	}

	return enemyUnits.sort((a, b) => a.id - b.id);
};

export const createItemUnits = (itemsMetadata: IItemMetadata[]): IItemUnit[] => {
	const itemUnits: IItemUnit[] = [];

	for (const itemMetadata of itemsMetadata) {
		itemUnits.push({
			id: itemMetadata.id,
			type: itemMetadata.type,
			position: itemMetadata.position,
			hidden: false,
		});
	}

	return itemUnits.sort((a, b) => a.id - b.id);
};

export const createTileEvents = (tileEventsMetadata: ITileEventMetadata[]): ITileEvent[] => {
	const tileEvents: ITileEvent[] = [];

	for (const tileEventMetadata of tileEventsMetadata) {
		tileEvents.push({
			id: tileEventMetadata.id,
			type: tileEventMetadata.type,
			targetEventTileId: tileEventMetadata.targetTileEventId,
			position: tileEventMetadata.position,
			active: true,
			hidden: tileEventMetadata.hidden,
		});
	}

	return tileEvents.sort((a, b) => a.id - b.id);
};

export const findActivePlayerUnit = (
	playerUnits: IPlayerUnit[],
	predicate: (playerUnit: IPlayerUnit) => boolean
): IPlayerUnit | undefined => {
	return playerUnits.find((x) => !x.hidden && predicate(x));
};

export const findActiveEnemyUnit = (
	enemyUnits: IEnemyUnit[],
	predicate: (value: IEnemyUnit) => boolean
): IEnemyUnit | undefined => {
	return enemyUnits.find((x) => !x.hidden && predicate(x));
};

export const findActiveItemUnit = (
	itemUnits: IItemUnit[],
	predicate: (value: IItemUnit) => boolean
): IItemUnit | undefined => {
	return itemUnits.find((x) => !x.hidden && predicate(x));
};

export const findActiveTileEvent = (
	tileEvents: ITileEvent[],
	predicate: (value: ITileEvent) => boolean
): ITileEvent | undefined => {
	return tileEvents.find(predicate);
};

export const GetIsWrapTriggerable = (
	playerUnit: IPlayerUnit,
	playerUnits: IPlayerUnit[],
	enemyUnits: IEnemyUnit[],
	tileEvents: ITileEvent[]
): boolean => {
	const tileEvent = findActiveTileEvent(tileEvents, isUnitPositionEquals(playerUnit.position));
	if (!tileEvent) {
		return false;
	}
	if (tileEvent.type !== TileEventType.WARP_TILE) {
		return false;
	}

	const targetTileEvent = findActiveTileEvent(tileEvents, (x) => x.id === tileEvent.targetEventTileId);
	if (!targetTileEvent) {
		return false;
	}
	if (targetTileEvent.type !== TileEventType.WARP_TILE) {
		return false;
	}

	const targetPlayerUnit = findActivePlayerUnit(playerUnits, isUnitPositionEquals(targetTileEvent.position));
	if (targetPlayerUnit) {
		return false;
	}

	const targetEnemyUnit = findActiveEnemyUnit(enemyUnits, isUnitPositionEquals(targetTileEvent.position));
	if (targetEnemyUnit) {
		return false;
	}

	return true;
};

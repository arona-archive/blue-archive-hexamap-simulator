import { AttackType, DefenceType, EnemyRank, ItemType, MovementType, TileEventType } from '../constants';
import { IPosition } from './metadata';

export * from './metadata';

type IDirectionType = -1 | 0 | 1;

export interface IDirection {
	angle: number;
	direction: [IDirectionType, IDirectionType];
}

export interface ITile {
	readonly id: number;
	readonly position: IPosition;
	tilePosition: IPosition;
	hidden: boolean;
}

export interface IPlayerUnit {
	readonly id: number;
	readonly attackType: AttackType;
	position: IPosition;
	nextDirections: IDirection[];
	items: ItemType[];
	movable: boolean;
	movementOrder: number;
	hidden: boolean;
}

export interface IEnemyUnit {
	readonly id: number;
	readonly rank: EnemyRank;
	readonly defenceType: DefenceType;
	readonly movementType: MovementType;
	position: IPosition;
	nextDirection?: IDirection;
	defeated: boolean;
	hidden: boolean;
}

export interface IItemUnit {
	readonly id: number;
	readonly type: ItemType;
	readonly position: IPosition;
	hidden: boolean;
}

export interface ITileEvent {
	readonly id: number;
	readonly type: TileEventType;
	readonly targetEventTileId?: number;
	readonly position: IPosition;
	active: boolean;
	hidden: boolean;
}

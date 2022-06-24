import {
	AttackType,
	DefenceType,
	EnemyRank,
	ItemType,
	MovementType,
	StageActionType,
	TileEventType,
} from '../constants';
import { IText } from './localization';
import { IPosition } from './metadata';

export * from './localization';
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

export interface INextPhaseStageAction {
	type: StageActionType.NEXT_PHASE;
}

export interface IAddPlayerUnitStageAction {
	type: StageActionType.ADD_PLAYER_UNIT;
	playerUnitId: number;
	attackType: AttackType;
	position: IPosition;
}

export interface IMovePlayerUnitStageAction {
	type: StageActionType.MOVE_PLAYER_UNIT;
	playerUnitId: number;
	nextPosition: IPosition;
}

export interface ISwapPlayerUnitsStageAction {
	type: StageActionType.SWAP_PLAYER_UNITS;
	srcPlayerUnitId: number;
	destPlayerUnitId: number;
}

export interface IMoveEnemyUnitStageAction {
	type: StageActionType.MOVE_ENEMY_UNIT;
	enemyUnitId: number;
	nextPosition: IPosition;
}

export interface IBattleStageAction {
	type: StageActionType.BATTLE;
	playerUnitId: number;
	enemyUnitId: number;
}

export interface IGetItemStageAction {
	type: StageActionType.GET_ITEM;
	playerUnitId: number;
	itemUnitId: number;
}

export interface ITileEventStageAction {
	type: StageActionType.TILE_EVENT;
	playerUnitId: number;
	tileEventId: number;
}

export interface ITriggerWrapStageAction {
	type: StageActionType.TRIGGER_WARP;
	playerUnitId: number;
	tileEventId: number;
}

export interface IClearStageAction {
	type: StageActionType.CLEAR;
}

export type IStageAction =
	| INextPhaseStageAction
	| IAddPlayerUnitStageAction
	| IMovePlayerUnitStageAction
	| ISwapPlayerUnitsStageAction
	| IMoveEnemyUnitStageAction
	| IBattleStageAction
	| IGetItemStageAction
	| ITileEventStageAction
	| ITriggerWrapStageAction
	| IClearStageAction;

export interface IDelayedStageAction {
	phase: number;
	action: IStageAction;
}

export interface INavigationPath {
	path: string;
	name: IText;
}

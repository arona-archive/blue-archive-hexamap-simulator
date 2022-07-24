import { DefenceType, DifficultyType, EnemyRank, ItemType, MovementType, TileEventType } from '../../constants';
import { IText } from '../_localization';

export type IPosition = [number, number];

export interface IMetadata {
	readonly campaigns: ICampaignMetadata[];
	readonly events: IEventMetadata[];
}

export interface ICampaignMetadata {
	readonly id: number;
	readonly name: IText;
	readonly stages: IStageMetadata[];
}

export interface IEventMetadata {
	readonly id: number;
	readonly name: IText;
	readonly stages: IStageMetadata[];
}

export interface IStageMetadata {
	readonly id: number;
	// readonly name: IText;
	readonly difficultyType: DifficultyType;
	readonly starConditions: IStageStarConditionsMetadata;
}

export interface IStageStarConditionsMetadata {
	readonly rank: number;
	readonly phase: number;
}

export interface IHexaMapMetadata {
	readonly id: number;
	readonly tiles: ITileMetadata[];
	readonly enemyUnits: IEnemyUnitMetadata[];
	readonly items: IItemMetadata[];
	readonly tileEvents: ITileEventMetadata[];
}

export interface ITileMetadata {
	readonly id: number;
	readonly position: IPosition;
}

export interface IEnemyUnitMetadata {
	readonly id: number;
	readonly enemyRank: EnemyRank;
	readonly defenceType: DefenceType;
	readonly movementType: MovementType;
	readonly position: IPosition;
}

export interface IItemMetadata {
	readonly id: number;
	readonly type: ItemType;
	readonly position: IPosition;
}

export interface ITileEventMetadata {
	readonly id: number;
	readonly type: TileEventType;
	readonly position: IPosition;
	readonly targetTileEventId?: number;
	readonly hidden: boolean;
}

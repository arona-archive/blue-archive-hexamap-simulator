import { IPosition } from './metadata';

export * from './metadata';

export interface ITile {
	readonly id: number;
	readonly position: IPosition;
	tilePosition: IPosition;
	hidden: boolean;
}

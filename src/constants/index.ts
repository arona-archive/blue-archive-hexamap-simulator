import { IDirection } from '../types';

export * from './metadata';

export const TILE_SIZE = 100;

export const DIRECTIONS: [IDirection, IDirection, IDirection, IDirection, IDirection, IDirection] = [
	{
		angle: (360 / 6) * 0,
		direction: [1, -1],
	},
	{
		angle: (360 / 6) * 1,
		direction: [0, -1],
	},
	{
		angle: (360 / 6) * 2,
		direction: [-1, 0],
	},
	{
		angle: (360 / 6) * 3,
		direction: [-1, 1],
	},
	{
		angle: (360 / 6) * 4,
		direction: [0, 1],
	},
	{
		angle: (360 / 6) * 5,
		direction: [1, 0],
	},
];

export enum StageActionType {
	NEXT_PHASE = 'NEXT_PHASE',
	ADD_PLAYER_UNIT = 'ADD_PLAYER_UNIT',
	MOVE_PLAYER_UNIT = 'MOVE_PLAYER_UNIT',
	SWAP_PLAYER_UNITS = 'SWAP_PLAYER_UNITS',
	MOVE_ENEMY_UNIT = 'MOVE_ENEMY_UNIT',
	BATTLE = 'BATTLE',
	GET_ITEM = 'GET_ITEM',
	CLEAR = 'CLEAR',
}

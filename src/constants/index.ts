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

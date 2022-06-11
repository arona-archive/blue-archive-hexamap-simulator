import { DIRECTIONS } from '../constants';
import { IDirection, IPosition } from '../types';

export const isPositionEquals = (a?: IPosition, b?: IPosition): boolean => {
	if (!a || !b) {
		return false;
	}
	return a[0] === b[0] && a[1] === b[1];
};

export const isUnitPositionEquals = (position?: IPosition) => {
	return <T extends { position: IPosition }>(unit?: T) => {
		return isPositionEquals(position, unit?.position);
	};
};

export const getNextPosition = (prev: IPosition, direction: IDirection): IPosition => {
	return [prev[0] + direction.direction[0], prev[1] + direction.direction[1]];
};

export const isNextPositionValid = (prev: IPosition, next: IPosition, directions: IDirection[]): boolean => {
	for (const direction of directions) {
		const p = getNextPosition(prev, direction);
		if (isPositionEquals(p, next)) {
			return true;
		}
	}
	return false;
};

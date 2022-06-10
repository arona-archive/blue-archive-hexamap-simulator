import { IPosition } from '../types';

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

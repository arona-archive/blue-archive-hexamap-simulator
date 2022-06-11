import { DIRECTIONS } from '../constants';
import { IDirection, IEnemyUnit, IPlayerUnit, IPosition, ITile } from '../types';

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

export const getNeighboringPlayerUnitDirection = (
	position: IPosition,
	playerUnits: IPlayerUnit[]
): IDirection | undefined => {
	for (const playerUnit of playerUnits.slice().sort((a, b) => a.movementOrder - b.movementOrder)) {
		for (const direction of DIRECTIONS) {
			const nextPosition = getNextPosition(position, direction);
			if (isPositionEquals(playerUnit.position, nextPosition)) {
				return direction;
			}
		}
	}
};

const getPaths = (positions: IPosition[], srcPosition: IPosition, destPosition: IPosition): number[][] => {
	const results: number[][] = [];

	const srcIndex = positions.findIndex((x) => isPositionEquals(x, srcPosition));
	if (srcIndex === -1) {
		return results;
	}
	const destIndex = positions.findIndex((x) => isPositionEquals(x, destPosition));
	if (destIndex === -1) {
		return results;
	}

	const fn = (indices: number[]): number[] | undefined => {
		if (indices.length === 0) {
			return;
		}
		const index = indices[indices.length - 1];
		if (index === undefined) {
			return;
		}
		if (index === destIndex) {
			return [...indices];
		}
		const position = positions[index];
		if (!position) {
			return;
		}
		const nextPositions = DIRECTIONS.map((x) => getNextPosition(position, x));
		const nextIndices = nextPositions
			.map((x) => positions.findIndex((y) => isPositionEquals(x, y)))
			.filter((x) => x !== -1)
			.filter((x) => !indices.includes(x));
		for (const nextIndex of nextIndices) {
			indices.push(nextIndex);
			const result = fn(indices);
			if (result) {
				results.push(result);
			}
			indices.pop();
		}
	};
	fn([srcIndex]);

	return results;
};

const getNearestPath = (
	positions: IPosition[],
	srcPosition: IPosition,
	destPositions: IPosition[]
): number[] | undefined => {
	let minDistance = Infinity;
	let minIndices: number[] = [];

	for (const destPosition of destPositions) {
		const results = getPaths(positions, srcPosition, destPosition);
		for (const indices of results) {
			if (minDistance <= indices.length) {
				continue;
			}

			minDistance = indices.length;
			minIndices = indices;
		}
	}

	if (minDistance === Infinity) {
		return;
	}
	return minIndices;
};

export const getNearestPlayerUnitDirection = (
	position: IPosition,
	tiles: ITile[],
	playerUnits: IPlayerUnit[],
	enemyUnits: IEnemyUnit[]
): IDirection | undefined => {
	const positions = tiles.filter((x) => !x.hidden).map((x) => x.position);

	const destPosition = playerUnits
		.slice()
		.sort((a, b) => a.movementOrder - b.movementOrder)
		.map((x) => x.position);

	const indices = getNearestPath(positions, position, destPosition);
	if (!indices) {
		return;
	}

	const nextIndex = indices[1];
	if (nextIndex === undefined) {
		return;
	}

	const nextPosition = positions[nextIndex];
	if (!nextPosition) {
		return;
	}

	for (const direction of DIRECTIONS) {
		const candidatePosition = getNextPosition(position, direction);
		if (!isPositionEquals(nextPosition, candidatePosition)) {
			continue;
		}
		const enemyUnit = enemyUnits.find((enemyUnit) => {
			const position = enemyUnit.nextDirection
				? getNextPosition(enemyUnit.position, enemyUnit.nextDirection)
				: enemyUnit.position;
			return isPositionEquals(position, nextPosition);
		});
		if (enemyUnit && !enemyUnit.hidden) {
			continue;
		}
		return direction;
	}
};

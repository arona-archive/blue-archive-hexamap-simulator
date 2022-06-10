import { ITile, IPosition, ITileMetadata } from '../types';

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

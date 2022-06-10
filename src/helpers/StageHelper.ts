import { StageState } from '../reducers';
import { createEnemyUnits, createItemUnits, createTileEvents, createTiles, isUnitPositionEquals } from '../utils';

export class StageHelper {
	public constructor(private readonly state: StageState) {}

	private initialize() {
		if (!this.state.hexamap) {
			return;
		}

		this.state.tiles = createTiles(this.state.hexamap.tiles);
		this.state.enemyUnits = createEnemyUnits(this.state.hexamap.enemyUnits);
		this.state.itemUnits = createItemUnits(this.state.hexamap.items);
		this.state.tileEvents = createTileEvents(this.state.hexamap.tileEvents);

		this.updateTiles();
	}

	private updateTiles() {
		for (const tileEvent of this.state.tileEvents) {
			const tile = this.state.tiles.find(isUnitPositionEquals(tileEvent.position));
			if (!tile) {
				continue;
			}

			tile.hidden = tileEvent.hidden;
		}
	}

	public process() {
		this.initialize();
	}
}

import { StageState } from '../reducers';
import { createEnemyUnits, createTiles } from '../utils';

export class StageHelper {
	public constructor(private readonly state: StageState) {}

	private initialize() {
		if (!this.state.hexamap) {
			return;
		}

		this.state.tiles = createTiles(this.state.hexamap.tiles);
		this.state.enemyUnits = createEnemyUnits(this.state.hexamap.enemyUnits);
	}

	public process() {
		this.initialize();
	}
}

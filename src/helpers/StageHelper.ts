import { StageState } from '../reducers';
import { createTiles } from '../utils';

export class StageHelper {
	public constructor(private readonly state: StageState) {}

	private initialize() {
		if (!this.state.hexamap) {
			return;
		}

		this.state.tiles = createTiles(this.state.hexamap.tiles);
	}

	public process() {
		this.initialize();
	}
}

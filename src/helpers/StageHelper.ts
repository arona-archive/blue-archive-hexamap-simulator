import { StageActionType } from '../constants';
import { StageState } from '../reducers';
import { IStageAction } from '../types';
import { createEnemyUnits, createItemUnits, createTileEvents, createTiles, isUnitPositionEquals } from '../utils';

export class StageHelper {
	private movementOrder = 1;

	public constructor(private readonly state: StageState) {}

	private initialize() {
		if (!this.state.hexamap) {
			return;
		}

		this.state.currentPhase = 0;
		this.state.tiles = createTiles(this.state.hexamap.tiles);
		this.state.enemyUnits = createEnemyUnits(this.state.hexamap.enemyUnits);
		this.state.itemUnits = createItemUnits(this.state.hexamap.items);
		this.state.tileEvents = createTileEvents(this.state.hexamap.tileEvents);
		this.state.cleared = false;

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

	private processAction(action: IStageAction) {
		switch (action.type) {
			case StageActionType.NEXT_PHASE: {
				this.state.currentPhase += 1;

				return;
			}
			case StageActionType.ADD_PLAYER_UNIT: {
				this.state.playerUnits.push({
					id: action.playerUnitId,
					attackType: action.attackType,
					position: action.position,
					nextDirections: [],
					items: [],
					movable: false,
					movementOrder: this.movementOrder,
					hidden: false,
				});

				this.movementOrder += 1;

				return;
			}
			case StageActionType.CLEAR: {
				this.state.cleared = true;

				return;
			}
		}
	}

	public process() {
		this.initialize();

		for (const action of this.state.stageActions) {
			this.processAction(action);

			this.updateTiles();
		}
	}
}

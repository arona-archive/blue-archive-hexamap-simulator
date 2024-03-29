import { DIRECTIONS, MovementType, StageActionType, TileEventType } from '../constants';
import { StageState } from '../reducers';
import { IPosition, IStageAction } from '../types';
import {
	createEnemyUnits,
	createItemUnits,
	createTileEvents,
	createTiles,
	getNearestEventTile,
	getNearestPlayerUnitDirection,
	getNeighboringPlayerUnitDirection,
	isPositionEquals,
	isUnitPositionEquals,
} from '../utils';

export type StageHelperState = Omit<StageState, 'activeTileId' | 'replayStageActionIndex'>;

export class StageHelper {
	private movementOrder = 1;

	public constructor(private readonly state: StageHelperState) {}

	private initialize() {
		if (!this.state.hexamap) {
			return;
		}

		this.state.currentPhase = 0;
		this.state.tiles = createTiles(this.state.hexamap.tiles);
		this.state.playerUnits = [];
		this.state.enemyUnits = createEnemyUnits(this.state.hexamap.enemyUnits);
		this.state.itemUnits = createItemUnits(this.state.hexamap.items);
		this.state.tileEvents = createTileEvents(this.state.hexamap.tileEvents);
		this.state.delayedStageActions = [];
		this.state.cleared = false;

		this.updateTiles();
	}

	private getPlayerUnit(id?: number) {
		return this.state.playerUnits.find((x) => x.id === id);
	}

	private getEnemyUnit(id?: number) {
		return this.state.enemyUnits.find((x) => x.id === id);
	}

	private getItemUnit(id?: number) {
		return this.state.itemUnits.find((x) => x.id === id);
	}

	private getTileEvent(id?: number) {
		return this.state.tileEvents.find((x) => x.id === id);
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

	private updatePlayerUnits() {
		for (const playerUnit of this.state.playerUnits) {
			const tile = this.state.tiles.find(isUnitPositionEquals(playerUnit.position));
			if (!tile) {
				continue;
			}
			if (!tile.hidden) {
				continue;
			}

			const tileEvents = this.state.tileEvents.filter((x) => x.type === TileEventType.START_TILE);
			const tileEvent = getNearestEventTile(playerUnit.position, tileEvents);
			if (!tileEvent) {
				continue;
			}

			playerUnit.position = tileEvent.position;
		}
	}

	private updateEnemyUnits() {
		for (const enemyUnit of this.state.enemyUnits) {
			const tile = this.state.tiles.find(isUnitPositionEquals(enemyUnit.position));
			if (!tile) {
				continue;
			}
			if (!tile.hidden) {
				continue;
			}

			enemyUnit.hidden = true;
		}
	}

	private updateNextDirections() {
		for (const playerUnit of this.state.playerUnits) {
			playerUnit.nextDirections = [];

			if (this.state.cleared) {
				continue;
			}

			const nextDirections = DIRECTIONS.filter(({ direction }) => {
				const x = playerUnit.position[0] + direction[0];
				const y = playerUnit.position[1] + direction[1];
				const targetTile = this.state.tiles.find(isUnitPositionEquals([x, y]));
				if (!targetTile) {
					return false;
				}
				return !targetTile.hidden;
			});
			playerUnit.nextDirections = nextDirections;
		}

		for (const enemyUnit of this.state.enemyUnits) {
			delete enemyUnit.nextDirection;

			if (this.state.cleared) {
				continue;
			}

			if (enemyUnit.hidden) {
				continue;
			}

			const getNextDirection = () => {
				switch (enemyUnit.movementType) {
					case MovementType.B: {
						return getNeighboringPlayerUnitDirection(enemyUnit.position, this.state.playerUnits);
					}
					case MovementType.C: {
						return getNearestPlayerUnitDirection(
							enemyUnit.position,
							this.state.tiles,
							this.state.playerUnits,
							this.state.enemyUnits
						);
					}
				}
			};

			const nextDirection = getNextDirection();
			if (!nextDirection) {
				continue;
			}

			enemyUnit.nextDirection = nextDirection;
		}
	}

	private processAction(action: IStageAction) {
		switch (action.type) {
			case StageActionType.NEXT_PHASE: {
				this.state.currentPhase += 1;

				for (const playerUnit of this.state.playerUnits) {
					if (playerUnit.hidden) {
						continue;
					}
					playerUnit.movable = true;
				}

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
			case StageActionType.MOVE_PLAYER_UNIT: {
				const playerUnit = this.getPlayerUnit(action.playerUnitId);
				if (!playerUnit) {
					return;
				}

				playerUnit.position = action.nextPosition;
				playerUnit.movable = false;
				playerUnit.movementOrder = this.movementOrder;
				this.movementOrder += 1;

				return;
			}
			case StageActionType.SWAP_PLAYER_UNITS: {
				const srcPlayerUnit = this.getPlayerUnit(action.srcPlayerUnitId);
				if (!srcPlayerUnit) {
					return;
				}

				const destPlayerUnit = this.getPlayerUnit(action.destPlayerUnitId);
				if (!destPlayerUnit) {
					return;
				}

				const p: IPosition = [...srcPlayerUnit.position];
				const q: IPosition = [...destPlayerUnit.position];

				srcPlayerUnit.position = q;
				destPlayerUnit.position = p;

				return;
			}
			case StageActionType.MOVE_ENEMY_UNIT: {
				const enemyUnit = this.getEnemyUnit(action.enemyUnitId);
				if (!enemyUnit) {
					return;
				}

				enemyUnit.position = action.nextPosition;
				delete enemyUnit.nextDirection;

				return;
			}
			case StageActionType.BATTLE: {
				const enemyUnit = this.getEnemyUnit(action.enemyUnitId);
				if (!enemyUnit) {
					return;
				}

				enemyUnit.defeated = true;
				enemyUnit.hidden = true;

				return;
			}
			case StageActionType.GET_ITEM: {
				const playerUnit = this.getPlayerUnit(action.playerUnitId);
				if (!playerUnit) {
					return;
				}

				const itemUnit = this.getItemUnit(action.itemUnitId);
				if (!itemUnit) {
					return;
				}

				playerUnit.items.push(itemUnit.type);
				itemUnit.hidden = true;

				return;
			}
			case StageActionType.TILE_EVENT: {
				const tileEvent = this.getTileEvent(action.tileEventId);
				if (!tileEvent) {
					return;
				}
				if (tileEvent.hidden) {
					return;
				}

				switch (tileEvent.type) {
					case TileEventType.BUTTON_TILE: {
						if (!tileEvent.active) {
							return;
						}
						const targetTileEvent = this.getTileEvent(tileEvent.targetEventTileId);
						if (!targetTileEvent) {
							return;
						}
						if (!targetTileEvent.active) {
							return;
						}

						tileEvent.active = false;
						targetTileEvent.active = false;
						targetTileEvent.hidden = !targetTileEvent.hidden;

						return;
					}
					case TileEventType.BROKEN_TILE: {
						if (tileEvent.active) {
							tileEvent.active = false;

							this.state.delayedStageActions.push({
								phase: this.state.currentPhase + 1,
								action: {
									type: StageActionType.TILE_EVENT,
									playerUnitId: -1,
									tileEventId: tileEvent.id,
								},
							});
						} else {
							if (action.playerUnitId !== -1) {
								return;
							}

							tileEvent.hidden = true;
						}

						return;
					}
					case TileEventType.SWITCH_TILE: {
						if (!tileEvent.active) {
							return;
						}

						const targetTileEvent = this.state.tileEvents.find((x) => x.id === tileEvent.targetEventTileId);
						if (!targetTileEvent) {
							return;
						}

						targetTileEvent.hidden = !targetTileEvent.hidden;

						return;
					}
				}

				return;
			}
			case StageActionType.TRIGGER_WARP: {
				const playerUnit = this.getPlayerUnit(action.playerUnitId);
				if (!playerUnit) {
					return;
				}
				if (playerUnit.hidden) {
					return;
				}

				const tileEvent = this.getTileEvent(action.tileEventId);
				if (!tileEvent) {
					return;
				}
				if (tileEvent.hidden) {
					return;
				}
				if (!tileEvent.active) {
					return;
				}
				if (!isPositionEquals(playerUnit.position, tileEvent.position)) {
					return;
				}

				const targetTileEvent = this.getTileEvent(tileEvent.targetEventTileId);
				if (!targetTileEvent) {
					return;
				}
				if (targetTileEvent.hidden) {
					return;
				}
				if (!targetTileEvent.active) {
					return false;
				}

				playerUnit.position = targetTileEvent.position;

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
			this.updateEnemyUnits();
			this.updatePlayerUnits();
			this.updateNextDirections();
		}
	}
}

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { AttackType } from '../constants';
import { StageHelper } from '../helpers';
import { IEnemyUnit, IHexaMapMetadata, IItemUnit, IPlayerUnit, IPosition, ITile, ITileEvent } from '../types';
import { isUnitPositionEquals } from '../utils';

export interface StageState {
	hexamap: IHexaMapMetadata | null;
	activeTileId: number;
	tiles: ITile[];
	playerUnits: IPlayerUnit[];
	enemyUnits: IEnemyUnit[];
	itemUnits: IItemUnit[];
	tileEvents: ITileEvent[];
}

const initialState: StageState = {
	hexamap: null,
	activeTileId: -1,
	tiles: [],
	playerUnits: [],
	enemyUnits: [],
	itemUnits: [],
	tileEvents: [],
};

const stageSlice = createSlice({
	name: 'stage',
	initialState,
	reducers: {
		initialize: () => initialState,
		setHexamap: (state, action: PayloadAction<IHexaMapMetadata>) => {
			state.hexamap = action.payload;

			const helper = new StageHelper(state);
			helper.process();
		},
		selectTile: (state, action: PayloadAction<number>) => {
			state.activeTileId = action.payload;
		},
		deselectTile: (state, action: PayloadAction<void>) => {
			state.activeTileId = initialState.activeTileId;
		},
		addPlayerUnit: (state, action: PayloadAction<{ attackType: AttackType; position: IPosition }>) => {
			const { attackType, position } = action.payload;

			state.playerUnits.push({
				id: state.playerUnits.length + 1,
				attackType,
				position,
				nextDirections: [],
				items: [],
				movable: true,
				movementOrder: state.playerUnits.length + 1,
				hidden: false,
			});

			const helper = new StageHelper(state);
			helper.process();
		},
		updatePlayerUnit: (state, action: PayloadAction<{ id: number; attackType: AttackType }>) => {
			const { id, attackType } = action.payload;

			const playerUnit = state.playerUnits.find((x) => x.id === id);
			if (!playerUnit) {
				return;
			}

			playerUnit.attackType = attackType;

			const helper = new StageHelper(state);
			helper.process();
		},
	},
});

export const { initialize, setHexamap, selectTile, deselectTile, addPlayerUnit, updatePlayerUnit } = stageSlice.actions;

export const getActiveTile = (state: RootState) => state.stage.tiles.find((x) => x.id === state.stage.activeTileId);
export const getActiveTileEvent = (state: RootState) => {
	const activeTile = getActiveTile(state);
	if (!activeTile) {
		return;
	}
	return state.stage.tileEvents.find(isUnitPositionEquals(activeTile.position));
};
export const getActivePlayerUnit = (state: RootState) => {
	const activeTile = getActiveTile(state);
	if (!activeTile) {
		return;
	}
	return state.stage.playerUnits.find(isUnitPositionEquals(activeTile.position));
};
export const getTiles = (state: RootState) => state.stage.tiles;
export const getPlayerUnits = (state: RootState) => state.stage.playerUnits;
export const getEnemyUnits = (state: RootState) => state.stage.enemyUnits;
export const getItemUnits = (state: RootState) => state.stage.itemUnits;
export const getTileEvents = (state: RootState) => state.stage.tileEvents;

export const stageReducer = stageSlice.reducer;

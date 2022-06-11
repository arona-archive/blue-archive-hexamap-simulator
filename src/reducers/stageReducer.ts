import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { AttackType, StageActionType } from '../constants';
import { StageHelper } from '../helpers';
import {
	IEnemyUnit,
	IHexaMapMetadata,
	IItemUnit,
	IPlayerUnit,
	IPosition,
	IStageAction,
	ITile,
	ITileEvent,
} from '../types';
import { findLastIndex, isUnitPositionEquals } from '../utils';

export interface StageState {
	hexamap: IHexaMapMetadata | null;
	activeTileId: number;
	currentPhase: number;
	tiles: ITile[];
	playerUnits: IPlayerUnit[];
	enemyUnits: IEnemyUnit[];
	itemUnits: IItemUnit[];
	tileEvents: ITileEvent[];
	stageActions: IStageAction[];
	cleared: boolean;
}

const initialState: StageState = {
	hexamap: null,
	activeTileId: -1,
	currentPhase: 0,
	tiles: [],
	playerUnits: [],
	enemyUnits: [],
	itemUnits: [],
	tileEvents: [],
	stageActions: [],
	cleared: false,
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

			state.stageActions.push({
				type: StageActionType.ADD_PLAYER_UNIT,
				playerUnitId: state.playerUnits.length + 1,
				attackType,
				position,
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

			for (const stageAction of state.stageActions) {
				if (stageAction.type !== StageActionType.ADD_PLAYER_UNIT) {
					continue;
				}
				if (stageAction.playerUnitId !== playerUnit.id) {
					continue;
				}
				stageAction.attackType = attackType;
			}

			const helper = new StageHelper(state);
			helper.process();
		},
		prevPhase: (state, action: PayloadAction<void>) => {
			const index = findLastIndex(state.stageActions, (x) => x.type === StageActionType.NEXT_PHASE);
			state.stageActions = state.stageActions.slice(0, index);

			const helper = new StageHelper(state);
			helper.process();
		},
		nextPhase: (state, action: PayloadAction<void>) => {
			state.activeTileId = initialState.activeTileId;

			state.stageActions.push({
				type: StageActionType.NEXT_PHASE,
			});

			const helper = new StageHelper(state);
			helper.process();
		},
	},
});

export const {
	initialize,
	setHexamap,
	selectTile,
	deselectTile,
	addPlayerUnit,
	updatePlayerUnit,
	prevPhase,
	nextPhase,
} = stageSlice.actions;

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
export const getCurrentPhase = (state: RootState) => state.stage.currentPhase;
export const getTiles = (state: RootState) => state.stage.tiles;
export const getPlayerUnits = (state: RootState) => state.stage.playerUnits;
export const getEnemyUnits = (state: RootState) => state.stage.enemyUnits;
export const getItemUnits = (state: RootState) => state.stage.itemUnits;
export const getTileEvents = (state: RootState) => state.stage.tileEvents;
export const getStageActions = (state: RootState) => state.stage.stageActions;
export const getCleared = (state: RootState) => state.stage.cleared;

export const stageReducer = stageSlice.reducer;

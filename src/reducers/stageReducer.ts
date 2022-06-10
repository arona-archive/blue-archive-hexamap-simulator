import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { StageHelper } from '../helpers';
import { IHexaMapMetadata, ITile } from '../types';

export interface StageState {
	hexamap: IHexaMapMetadata | null;
	activeTileId: number;
	tiles: ITile[];
}

const initialState: StageState = {
	hexamap: null,
	activeTileId: -1,
	tiles: [],
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
	},
});

export const { initialize, setHexamap, selectTile, deselectTile } = stageSlice.actions;

export const getActiveTile = (state: RootState) => state.stage.tiles.find((x) => x.id === state.stage.activeTileId);
export const getTiles = (state: RootState) => state.stage.tiles;

export const stageReducer = stageSlice.reducer;

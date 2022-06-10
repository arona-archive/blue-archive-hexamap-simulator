import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { StageHelper } from '../helpers';
import { IHexaMapMetadata } from '../types';

export interface StageState {
	hexamap: IHexaMapMetadata | null;
}

const initialState: StageState = {
	hexamap: null,
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
	},
});

export const { initialize, setHexamap } = stageSlice.actions;

export const stageReducer = stageSlice.reducer;

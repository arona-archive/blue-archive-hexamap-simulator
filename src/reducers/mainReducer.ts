import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { LanguageCode, StateType } from '../constants';

export interface MainState {
	languageCode: LanguageCode;
	stateType: StateType;
	debugFlag: boolean;
}

const initialState: MainState = {
	languageCode: LanguageCode.EN,
	stateType: StateType.EDIT,
	debugFlag: false,
};

const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		initialize: () => initialState,
		setLanguageCode: (state, action: PayloadAction<LanguageCode>) => {
			state.languageCode = action.payload;
		},
		setStateType: (state, action: PayloadAction<StateType>) => {
			state.stateType = action.payload;
		},
	},
});

export const { initialize: initializeMain, setLanguageCode, setStateType } = mainSlice.actions;

export const getLanguageCode = (state: RootState) => state.main.languageCode;
export const getStateType = (state: RootState) => state.main.stateType;
export const getDebugFlag = (state: RootState) => state.main.debugFlag;

export const mainReducer = mainSlice.reducer;

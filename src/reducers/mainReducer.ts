import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { LanguageCode } from '../constants';

export interface MainState {
	languageCode: LanguageCode;
	debugFlag: boolean;
}

const initialState: MainState = {
	languageCode: LanguageCode.EN,
	debugFlag: false,
};

const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		setLanguageCode: (state: MainState, action: PayloadAction<LanguageCode>) => {
			state.languageCode = action.payload;
		},
	},
});

export const { setLanguageCode } = mainSlice.actions;

export const getLanguageCode = (state: RootState) => state.main.languageCode;
export const getDebugFlag = (state: RootState) => state.main.debugFlag;

export const mainReducer = mainSlice.reducer;

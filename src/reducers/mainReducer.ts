import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { LanguageCode } from '../constants';

export interface MainState {
	languageCode: LanguageCode;
}

const initialState: MainState = {
	languageCode: LanguageCode.EN,
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

export const mainReducer = mainSlice.reducer;

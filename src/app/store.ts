import { configureStore } from '@reduxjs/toolkit';
import { LocalStorageKey, StateType } from '../constants';
import { mainReducer, metadataReducer, stageReducer } from '../reducers';
import { IMetadata } from '../types';
import { getDefaultDebugFlag, getDefaultLanguageCode } from '../utils';
import metadata from '../_data/metadata.json';

export const store = configureStore({
	preloadedState: {
		main: {
			languageCode: getDefaultLanguageCode(),
			stateType: StateType.EDIT,
			debugFlag: getDefaultDebugFlag(),
		},
		metadata: {
			metadata: metadata as IMetadata,
		},
	},
	reducer: {
		main: mainReducer,
		metadata: metadataReducer,
		stage: stageReducer,
	},
});

store.subscribe(() => {
	const state = store.getState();

	window.localStorage.setItem(LocalStorageKey.LANGUAGE_CODE, state.main.languageCode);
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

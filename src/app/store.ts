import { configureStore } from '@reduxjs/toolkit';
import metadata from '../_data/metadata.json';
import { IMetadata } from '../types';
import { metadataReducer, stageReducer } from '../reducers';

export const store = configureStore({
	preloadedState: {
		metadata: {
			metadata: metadata as IMetadata,
		},
	},
	reducer: {
		metadata: metadataReducer,
		stage: stageReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

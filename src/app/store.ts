import { configureStore } from '@reduxjs/toolkit';
import metadata from '../_data/metadata.json';
import { IMetadata } from '../types';
import { metadataReducer } from '../reducers';

export const store = configureStore({
	preloadedState: {
		metadata: {
			metadata: metadata as IMetadata,
		},
	},
	reducer: {
		metadata: metadataReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

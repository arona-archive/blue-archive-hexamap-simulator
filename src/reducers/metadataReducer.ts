import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { IMetadata } from '../types';

export interface MetadataState {
	metadata: IMetadata;
}

const initialState: MetadataState = {
	metadata: {} as IMetadata,
};

const metadataSlice = createSlice({
	name: 'metadata',
	initialState,
	reducers: {},
});

export const {} = metadataSlice.actions;

export const getMetadata = (state: RootState) => state.metadata.metadata;

export const metadataReducer = metadataSlice.reducer;

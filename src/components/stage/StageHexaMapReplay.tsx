import React, { useMemo } from 'react';
import { StageHelper, StageHelperState } from '../../helpers';
import { useAppSelector } from '../../hooks';
import { getReplayStageActionIndex, getStageActions } from '../../reducers';
import { IHexaMapMetadata } from '../../types';
import { HexaMap } from '../hexa-map';

interface Props {
	hexamap: IHexaMapMetadata;
}

export const StageHexaMapReplay: React.FC<Props> = (props) => {
	const { hexamap } = props;

	const stageActions = useAppSelector(getStageActions);
	const replayStageActionIndex = useAppSelector(getReplayStageActionIndex);

	const replayStageActions = useMemo(() => {
		return stageActions.slice(0, replayStageActionIndex + 1);
	}, [stageActions, replayStageActionIndex]);

	const state = useMemo(() => {
		const state: StageHelperState = {
			hexamap,
			currentPhase: 0,
			tiles: [],
			playerUnits: [],
			enemyUnits: [],
			itemUnits: [],
			tileEvents: [],
			stageActions: replayStageActions,
			delayedStageActions: [],
			cleared: false,
		};

		const helper = new StageHelper(state);
		helper.process();

		return state;
	}, [replayStageActions, replayStageActionIndex]);

	const handleClickTile = () => {};

	return (
		<HexaMap
			tiles={state.tiles}
			playerUnits={state.playerUnits}
			enemyUnits={state.enemyUnits}
			itemUnits={state.itemUnits}
			tileEvents={state.tileEvents}
			onClickTile={handleClickTile}
		/>
	);
};

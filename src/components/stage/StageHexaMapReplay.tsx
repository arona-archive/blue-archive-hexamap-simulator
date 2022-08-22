import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { StageHelper } from '../../helpers';
import { useAppSelector } from '../../hooks';
import { getStageActions, StageState } from '../../reducers';
import { IHexaMapMetadata } from '../../types';
import { HexaMap } from '../hexa-map';

const Root = styled.div``;

interface Props {
	hexamap: IHexaMapMetadata;
}

export const StageHexaMapReplay: React.FC<Props> = (props) => {
	const { hexamap } = props;

	const [stageActionIndex, setStageActionIndex] = useState(1);

	const stageActions = useAppSelector(getStageActions);

	const state = useMemo(() => {
		const state: StageState = {
			hexamap,
			activeTileId: -1,
			currentPhase: 0,
			tiles: [],
			playerUnits: [],
			enemyUnits: [],
			itemUnits: [],
			tileEvents: [],
			stageActions: stageActions.slice(0, stageActionIndex),
			delayedStageActions: [],
			cleared: false,
		};

		const helper = new StageHelper(state);
		helper.process();

		return state;
	}, [stageActions, stageActionIndex]);

	const handleClickTile = () => {};

	const handleClickPrev = () => {
		const index = Math.max(stageActionIndex - 1, 1);
		setStageActionIndex(index);
	};

	const handleClickNext = () => {
		const index = Math.min(stageActionIndex + 1, stageActions.length - 1);
		setStageActionIndex(index);
	};

	return (
		<Root>
			<HexaMap
				tiles={state.tiles}
				playerUnits={state.playerUnits}
				enemyUnits={state.enemyUnits}
				itemUnits={state.itemUnits}
				tileEvents={state.tileEvents}
				onClickTile={handleClickTile}
			/>
			<div>
				<button type="button" className="btn btn-outline-primary w-100" onClick={handleClickPrev}>
					prev
				</button>
				<button type="button" className="btn btn-outline-primary w-100" onClick={handleClickNext}>
					next
				</button>
			</div>
		</Root>
	);
};

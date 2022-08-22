import React from 'react';
import { LocalizationKey, StateType } from '../../constants';
import { useAppSelector } from '../../hooks';
import { getReplayStageActionIndex, getStageActions, getStateType } from '../../reducers';
import { List } from '../list';

export const StageActionList: React.FC = () => {
	const stateType = useAppSelector(getStateType);
	const stageActions = useAppSelector(getStageActions);
	const replayStageActionIndex = useAppSelector(getReplayStageActionIndex);

	return (
		<List titleKey={LocalizationKey.STAGE_ACTIONS}>
			{stageActions.map((x, i) => (
				<div
					key={i}
					className={`list-group-item ${
						stateType === StateType.REPLAY && i === replayStageActionIndex ? 'list-group-item-info' : ''
					}`}
				>
					<pre>{JSON.stringify(x, null, 2)}</pre>
				</div>
			))}
		</List>
	);
};

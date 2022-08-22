import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
	getReplayStageActionIndex,
	getStageActions,
	nextReplayStageActionIndex,
	prevReplayStageActionIndex,
} from '../../reducers';

export const ReplayMenu: React.FC = () => {
	const stageActions = useAppSelector(getStageActions);
	const replayStageActionIndex = useAppSelector(getReplayStageActionIndex);

	const dispatch = useAppDispatch();

	const handleClickPrev = () => {
		dispatch(prevReplayStageActionIndex());
	};

	const handleClickNext = () => {
		dispatch(nextReplayStageActionIndex());
	};

	return (
		<div className="row">
			<div className="col-12 btn-group">
				<button
					type="button"
					className="btn btn-outline-primary"
					disabled={replayStageActionIndex === 0}
					onClick={handleClickPrev}
				>
					prev
				</button>
				<button
					type="button"
					className="btn btn-outline-primary"
					disabled={replayStageActionIndex === stageActions.length - 1}
					onClick={handleClickNext}
				>
					next
				</button>
			</div>
		</div>
	);
};

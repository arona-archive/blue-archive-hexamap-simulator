import React, { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
	getCleared,
	getCurrentPhase,
	getPlayerUnits,
	getStageActions,
	nextPhase,
	prevAction,
	prevPhase,
} from '../../reducers';

export const StageActionMenu: React.FC = () => {
	const currentPhase = useAppSelector(getCurrentPhase);
	const playerUnits = useAppSelector(getPlayerUnits);
	const stageActions = useAppSelector(getStageActions);
	const cleared = useAppSelector(getCleared);

	const dispatch = useAppDispatch();

	const isPrevPhaseButtonDisabled = useMemo(() => {
		return currentPhase === 0;
	}, [currentPhase]);

	const isNextPhaseButtonDisabled = useMemo(() => {
		return playerUnits.length === 0 || cleared;
	}, [playerUnits.length, cleared]);

	const isPrevActionButtonDisabled = useMemo(() => {
		return stageActions.length === 0;
	}, [stageActions.length]);

	const handleClickPrevPhase = useCallback(() => {
		dispatch(prevPhase());
	}, []);

	const handleClickNextPhase = useCallback(() => {
		dispatch(nextPhase());
	}, []);

	const handleClickPrevAction = useCallback(() => {
		dispatch(prevAction());
	}, []);

	return (
		<>
			<div className="row">
				<div className="col-12 btn-group">
					<button
						type="button"
						className="btn btn-primary"
						disabled={isPrevPhaseButtonDisabled}
						onClick={handleClickPrevPhase}
					>
						prev phase
					</button>
					<button
						type="button"
						className="btn btn-primary"
						disabled={isNextPhaseButtonDisabled}
						onClick={handleClickNextPhase}
					>
						next phase
					</button>
				</div>
			</div>
			<div className="row">
				<div className="col-12 btn-group">
					<button
						type="button"
						className="btn btn-primary"
						disabled={isPrevActionButtonDisabled}
						onClick={handleClickPrevAction}
					>
						undo
					</button>
				</div>
			</div>
		</>
	);
};

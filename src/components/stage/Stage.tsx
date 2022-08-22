import React, { useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LocalizationKey, STAGE_ACTIONS_SHARE_PREFIX, StateType } from '../../constants';
import { ShareHelper } from '../../helpers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
	getActivePlayerUnit,
	getCleared,
	getCurrentPhase,
	getEnemyUnits,
	getPlayerUnits,
	getStageActions,
	getTileEvents,
	initializeStage,
	nextPhase,
	prevAction,
	prevPhase,
	setHexamap,
	setStageActions,
	setStateType,
	triggerWrap,
} from '../../reducers';
import { IHexaMapMetadata, IStageMetadata } from '../../types';
import { getIsWrapTriggerable } from '../../utils';
import { List } from '../list';
import { StageHexaMap } from './StageHexaMap';
import { StageMenu } from './StageMenu';

const Root = styled.div`
	margin-top: 24px;

	& > * {
		margin-top: 12px;
	}
`;

const HexamapWrapper = styled.div`
	padding: 48px 24px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const MenuWrapper = styled.div`
	& > :not(:first-child) {
		margin-top: 12px;
	}
`;

interface Props {
	stage: IStageMetadata;
	hexamap: IHexaMapMetadata;
}

export const Stage: React.FC<Props> = (props) => {
	const { stage, hexamap } = props;

	const location = useLocation();
	const navigate = useNavigate();

	const activePlayerUnit = useAppSelector(getActivePlayerUnit);

	const currentPhase = useAppSelector(getCurrentPhase);
	const playerUnits = useAppSelector(getPlayerUnits);
	const enemyUnits = useAppSelector(getEnemyUnits);
	const tileEvents = useAppSelector(getTileEvents);
	const stageActions = useAppSelector(getStageActions);
	const cleared = useAppSelector(getCleared);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setStateType(StateType.EDIT));
		dispatch(initializeStage());
		dispatch(setHexamap(hexamap));
	}, [hexamap]);

	useEffect(() => {
		if (!location.hash.startsWith(STAGE_ACTIONS_SHARE_PREFIX)) {
			return;
		}

		const data = location.hash.slice(STAGE_ACTIONS_SHARE_PREFIX.length);

		const helper = new ShareHelper();
		const stageActions = helper.decode(data);

		dispatch(setStageActions(stageActions));
	}, []);

	useEffect(() => {
		const helper = new ShareHelper();
		const data = helper.encode(stageActions);
		navigate(`${STAGE_ACTIONS_SHARE_PREFIX}${data}`);
	}, [stageActions]);

	const isWrapTriggable = useMemo(() => {
		if (!activePlayerUnit) {
			return false;
		}
		return getIsWrapTriggerable(activePlayerUnit, playerUnits, enemyUnits, tileEvents);
	}, [activePlayerUnit, playerUnits, enemyUnits, tileEvents]);

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

	const handleClickTriggerWrap = useCallback(() => {
		if (!activePlayerUnit) {
			return;
		}
		dispatch(triggerWrap(activePlayerUnit.id));
	}, [activePlayerUnit]);

	return (
		<Root>
			<div className="row">
				<HexamapWrapper className="col-9">
					<StageHexaMap hexamap={hexamap} />
				</HexamapWrapper>
				<MenuWrapper className="col-3">
					<StageMenu stage={stage} />
				</MenuWrapper>
			</div>
			<div className="row">
				<div className="col-12">{`current phase=${currentPhase}`}</div>
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
			{isWrapTriggable && (
				<div className="row">
					<div className="col-12">
						<div className="form-inline">
							<div className="form-group">
								<button className="form-control" onClick={handleClickTriggerWrap}>
									trigger warp
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
			<List titleKey={LocalizationKey.STAGE_ACTIONS}>
				{stageActions.map((x, i) => (
					<div key={i} className="list-group-item">
						<pre>{JSON.stringify(x, null, 2)}</pre>
					</div>
				))}
			</List>
		</Root>
	);
};

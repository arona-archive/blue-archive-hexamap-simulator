import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AttackType, StageActionType, STAGE_ACTIONS_SHARE_PREFIX, StateType } from '../../constants';
import { ShareHelper } from '../../helpers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
	getActivePlayerUnit,
	getCurrentPhase,
	getStageActions,
	getStateType,
	initializeStage,
	setHexamap,
	setStageActions,
	setStateType,
	triggerWrap,
	updatePlayerUnit,
} from '../../reducers';
import { DatabaseService } from '../../services';
import { IHexaMapMetadata, IStageMetadata } from '../../types';
import { ReplayMenu } from './ReplayMenu';
import { StageActionList } from './StageActionList';
import { StageActionMenu } from './StageActionMenu';
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

	const [attackType, setAttackType] = useState(AttackType.EXPLOSIVE);

	const currentPhase = useAppSelector(getCurrentPhase);
	const stateType = useAppSelector(getStateType);
	const activePlayerUnit = useAppSelector(getActivePlayerUnit);
	const stageActions = useAppSelector(getStageActions);

	const dispatch = useAppDispatch();

	const location = useLocation();
	const navigate = useNavigate();

	const battleCount = useMemo(() => {
		return stageActions.filter((x) => x.type === StageActionType.BATTLE).length;
	}, [stageActions]);

	useEffect(() => {
		dispatch(setStateType(StateType.EDIT));
		dispatch(initializeStage());
		dispatch(setHexamap(hexamap));
	}, [hexamap]);

	useEffect(() => {
		(async () => {
			if (location.hash.startsWith(STAGE_ACTIONS_SHARE_PREFIX)) {
				const data = location.hash.slice(STAGE_ACTIONS_SHARE_PREFIX.length);
				const helper = new ShareHelper();
				const stageActions = helper.decode(data);
				if (stageActions.length === 0) {
					return;
				}
				dispatch(setStageActions(stageActions));
				navigate('#', { replace: true });
			} else {
				const service = new DatabaseService();
				const stageSolution = await service.getStageSolution(stage.id);
				const stageActions = stageSolution?.stageActions ?? [];
				if (stageActions.length === 0) {
					return;
				}
				dispatch(setStageActions(stageActions));
			}
		})();
	}, [location.hash, stage.id]);

	useEffect(() => {
		if (stageActions.every((action) => action.type !== StageActionType.CLEAR)) {
			return;
		}

		const service = new DatabaseService();
		service.setStageSolution(stage.id, stageActions, [
			true,
			battleCount >= stage.starConditions.rank,
			currentPhase <= stage.starConditions.phase,
		]);
	}, [stage.id, stageActions]);

	useEffect(() => {
		if (!activePlayerUnit) {
			return;
		}
		if (activePlayerUnit.attackType === attackType) {
			return;
		}

		setAttackType(activePlayerUnit.attackType);
	}, [activePlayerUnit]);

	const handleChangeAttackType = useCallback(
		(attackType: AttackType) => {
			setAttackType(attackType);

			if (!activePlayerUnit) {
				return;
			}
			if (activePlayerUnit.attackType === attackType) {
				return;
			}

			dispatch(
				updatePlayerUnit({
					id: activePlayerUnit.id,
					attackType,
				})
			);
		},
		[activePlayerUnit]
	);

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
					<StageHexaMap attackType={attackType} hexamap={hexamap} />
				</HexamapWrapper>
				<MenuWrapper className="col-3">
					<StageMenu
						stage={stage}
						currentPhase={currentPhase}
						attackType={attackType}
						battleCount={battleCount}
						onChangeAttackType={handleChangeAttackType}
						onClickTriggerWrap={handleClickTriggerWrap}
					/>
				</MenuWrapper>
			</div>
			{stateType === StateType.EDIT && <StageActionMenu />}
			{stateType === StateType.REPLAY && <ReplayMenu />}
			<StageActionList />
		</Root>
	);
};

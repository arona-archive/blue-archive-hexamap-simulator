import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AttackType, LocalizationKey, STAGE_ACTIONS_SHARE_PREFIX, StateType } from '../../constants';
import { ShareHelper } from '../../helpers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
	getActivePlayerUnit,
	getStageActions,
	initializeStage,
	setHexamap,
	setStageActions,
	setStateType,
	triggerWrap,
	updatePlayerUnit,
} from '../../reducers';
import { IHexaMapMetadata, IStageMetadata } from '../../types';
import { List } from '../list';
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

	const location = useLocation();
	const navigate = useNavigate();

	const activePlayerUnit = useAppSelector(getActivePlayerUnit);
	const stageActions = useAppSelector(getStageActions);

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
						attackType={attackType}
						onChangeAttackType={handleChangeAttackType}
						onClickTriggerWrap={handleClickTriggerWrap}
					/>
				</MenuWrapper>
			</div>
			<StageActionMenu />
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

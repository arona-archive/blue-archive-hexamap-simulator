import React from 'react';
import { AttackType, StateType } from '../../constants';
import { useAppSelector } from '../../hooks';
import { getStateType } from '../../reducers';
import { IHexaMapMetadata } from '../../types';
import { StageHexaMapEdit } from './StageHexaMapEdit';
import { StageHexaMapReplay } from './StageHexaMapReplay';

interface Props {
	attackType: AttackType;
	hexamap: IHexaMapMetadata;
}

export const StageHexaMap: React.FC<Props> = (props) => {
	const { attackType, hexamap } = props;

	const stateType = useAppSelector(getStateType);

	switch (stateType) {
		case StateType.EDIT: {
			return <StageHexaMapEdit attackType={attackType} />;
		}
		case StateType.REPLAY: {
			return <StageHexaMapReplay hexamap={hexamap} />;
		}
	}
};

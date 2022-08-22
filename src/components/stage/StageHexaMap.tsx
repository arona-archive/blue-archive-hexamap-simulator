import React from 'react';
import { StateType } from '../../constants';
import { useAppSelector } from '../../hooks';
import { getStateType } from '../../reducers';
import { IHexaMapMetadata } from '../../types';
import { StageHexaMapEdit } from './StageHexaMapEdit';
import { StageHexaMapReplay } from './StageHexaMapReplay';

interface Props {
	hexamap: IHexaMapMetadata;
}

export const StageHexaMap: React.FC<Props> = (props) => {
	const { hexamap } = props;

	const stateType = useAppSelector(getStateType);

	switch (stateType) {
		case StateType.EDIT: {
			return <StageHexaMapEdit />;
		}
		case StateType.REPLAY: {
			return <StageHexaMapReplay hexamap={hexamap} />;
		}
	}
};

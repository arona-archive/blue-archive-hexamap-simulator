import React, { useEffect } from 'react';
import styled from 'styled-components';
import { TILE_SIZE } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getEnemyUnits, getItemUnits, getTiles, initialize, setHexamap } from '../../reducers';
import { IHexaMapMetadata, IStageMetadata } from '../../types';
import { HexaMap } from '../hexa-map';

const HexamapWrapper = styled.div`
	padding: ${TILE_SIZE}px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

interface Props {
	stage: IStageMetadata;
	hexamap: IHexaMapMetadata;
}

export const Stage: React.FC<Props> = (props) => {
	const { stage, hexamap } = props;

	const tiles = useAppSelector(getTiles);
	const enemyUnits = useAppSelector(getEnemyUnits);
	const itemUnits = useAppSelector(getItemUnits);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(initialize());
		dispatch(setHexamap(hexamap));
	}, [hexamap]);

	return (
		<div className="row">
			<HexamapWrapper className="col">
				<HexaMap tiles={tiles} enemyUnits={enemyUnits} itemUnits={itemUnits} />
			</HexamapWrapper>
		</div>
	);
};

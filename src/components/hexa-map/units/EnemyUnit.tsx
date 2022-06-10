import React, { useMemo } from 'react';
import styled from 'styled-components';
import { DefenceType, MovementType, EnemyRank, TILE_SIZE } from '../../../constants';
import { IEnemyUnit } from '../../../types';
import { Hexagon } from '../Hexagon';

const Text = styled.p`
	font-weight: bold;
	color: #ffffff;
	white-space: nowrap;
`;

interface Props {
	enemyUnit: IEnemyUnit;
}

export const EnemyUnit: React.FC<Props> = (props) => {
	const { enemyUnit } = props;

	const rankStr = useMemo<string>(() => {
		switch (enemyUnit.rank) {
			case EnemyRank._1: {
				return '1';
			}
			case EnemyRank._2: {
				return '2';
			}
			case EnemyRank._3: {
				return '3';
			}
			case EnemyRank.BOSS: {
				return 'BOSS';
			}
		}
	}, [enemyUnit.rank]);

	const movementTypeStr = useMemo<string>(() => {
		switch (enemyUnit.movementType) {
			case MovementType.A: {
				return '';
			}
			case MovementType.B: {
				return '!';
			}
			case MovementType.C: {
				return '<';
			}
		}
	}, [enemyUnit.movementType]);

	const color = useMemo<string>(() => {
		switch (enemyUnit.defenceType) {
			case DefenceType.LIGHT_ARMOR: {
				return 'var(--bs-red)';
			}
			case DefenceType.HEAVY_ARMOR: {
				return 'var(--bs-yellow)';
			}
			case DefenceType.SPECIAL_ARMOR: {
				return 'var(--bs-blue)';
			}
		}
	}, [enemyUnit.defenceType]);

	const text = useMemo(() => {
		return [rankStr, movementTypeStr].join(' ').trim();
	}, [rankStr, movementTypeStr]);

	return (
		<Hexagon size={TILE_SIZE * 0.6} fillColor={color}>
			<Text>{text}</Text>
		</Hexagon>
	);
};

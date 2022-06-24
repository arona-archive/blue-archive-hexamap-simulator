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

	const rankEl = useMemo<React.ReactElement>(() => {
		switch (enemyUnit.rank) {
			case EnemyRank._1: {
				return (
					<>
						<i className="bi bi-suit-diamond-fill" />
						<span>1</span>
					</>
				);
			}
			case EnemyRank._2: {
				return (
					<>
						<i className="bi bi-suit-diamond-fill" />
						<span>2</span>
					</>
				);
			}
			case EnemyRank._3: {
				return (
					<>
						<i className="bi bi-suit-diamond-fill" />
						<span>3</span>
					</>
				);
			}
			case EnemyRank.BOSS: {
				return <>BOSS</>;
			}
		}
	}, [enemyUnit.rank]);

	const movementTypeEl = useMemo<React.ReactElement | null>(() => {
		switch (enemyUnit.movementType) {
			case MovementType.A: {
				return null;
			}
			case MovementType.B: {
				return <i className="bi bi-exclamation-lg" />;
			}
			case MovementType.C: {
				return <i className="bi bi-chevron-double-left" />;
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

	const textEl = useMemo<React.ReactNode>(() => {
		return (
			<>
				{movementTypeEl}
				{rankEl}
			</>
		);
	}, [rankEl, movementTypeEl]);

	return (
		<Hexagon size={TILE_SIZE * 0.6} fillColor={color}>
			<Text>{textEl}</Text>
		</Hexagon>
	);
};

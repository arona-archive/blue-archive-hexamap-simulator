import React, { useMemo } from 'react';
import styled from 'styled-components';
import { AttackType, ItemType, TILE_SIZE } from '../../../constants';
import { IPlayerUnit } from '../../../types';
import { Hexagon } from '../Hexagon';

const Text = styled.p`
	font-weight: bold;
	color: var(--bs-gray-dark);
	white-space: nowrap;

	& > *:not(:first-child) {
		margin-left: 4px;
	}
`;

interface Props {
	playerUnit: IPlayerUnit;
}

export const PlayerUnit: React.FC<Props> = (props) => {
	const { playerUnit } = props;

	const itemEl = useMemo<React.ReactElement>(() => {
		return (
			<>
				{playerUnit.items
					.map((type) => {
						switch (type) {
							case ItemType.HEAL: {
								return <i className="bi bi-plus-circle" />;
							}
							case ItemType.ATTACK_BUFF:
							case ItemType.DEFENCE_BUFF: {
								return <i className="bi bi-arrow-up-circle" />;
							}
							case ItemType.PYROXENE_BOX:
							case ItemType.LIGHT_DRONE: {
								return null;
							}
						}
					})
					.map((x, index) => (
						<React.Fragment key={index}>{x}</React.Fragment>
					))}
			</>
		);
	}, [playerUnit.items]);

	const color = useMemo<string>(() => {
		switch (playerUnit.attackType) {
			case AttackType.EXPLOSIVE: {
				return 'var(--bs-red)';
			}
			case AttackType.PIERCING: {
				return 'var(--bs-yellow)';
			}
			case AttackType.MYSTIC: {
				return 'var(--bs-blue)';
			}
		}
	}, [playerUnit.attackType]);

	const textEl = useMemo<React.ReactElement>(() => {
		return (
			<>
				<span>{playerUnit.id}</span>
				{itemEl}
			</>
		);
	}, [playerUnit.id, itemEl]);

	return (
		<Hexagon size={TILE_SIZE * 0.6} fillColor="#ffffff" strokeColor={color}>
			<Text>{textEl}</Text>
		</Hexagon>
	);
};

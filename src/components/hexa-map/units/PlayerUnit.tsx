import React, { useMemo } from 'react';
import styled from 'styled-components';
import { AttackType, ItemType, TILE_SIZE } from '../../../constants';
import { IPlayerUnit } from '../../../types';
import { Hexagon } from '../Hexagon';

const Text = styled.p`
	font-weight: bold;
	color: var(--bs-gray-dark);
	white-space: nowrap;
`;

interface Props {
	playerUnit: IPlayerUnit;
}

export const PlayerUnit: React.FC<Props> = (props) => {
	const { playerUnit } = props;

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

	const itemStr = useMemo<string>(() => {
		return playerUnit.items
			.map((x) => {
				switch (x) {
					case ItemType.HEAL: {
						return '+';
					}
					case ItemType.ATTACK_BUFF:
					case ItemType.DEFENCE_BUFF: {
						return '↑';
					}
					case ItemType.PYROXENE_BOX: {
						return '◆';
					}
					case ItemType.LIGHT_DRONE: {
						return '*';
					}
				}
			})
			.join(' ');
	}, [playerUnit.items]);

	const text = useMemo(() => {
		return [playerUnit.id, itemStr].join(' ').trim();
	}, [playerUnit.id, itemStr]);

	return (
		<Hexagon size={TILE_SIZE * 0.6} fillColor="#ffffff" strokeColor={color}>
			<Text>{text}</Text>
		</Hexagon>
	);
};

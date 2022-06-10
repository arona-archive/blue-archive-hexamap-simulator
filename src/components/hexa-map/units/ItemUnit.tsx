import React, { useMemo } from 'react';
import styled from 'styled-components';
import { ItemType, TILE_SIZE } from '../../../constants';
import { IItemUnit } from '../../../types';
import { Hexagon } from '../Hexagon';

const Text = styled.p`
	font-weight: bold;
	color: #ffffff;
	white-space: nowrap;
`;

interface Props {
	itemUnit: IItemUnit;
}

export const ItemUnit: React.FC<Props> = (props) => {
	const { itemUnit } = props;

	const color = useMemo<string>(() => {
		switch (itemUnit.type) {
			case ItemType.HEAL: {
				return 'var(--bs-yellow)';
			}
			case ItemType.ATTACK_BUFF:
			case ItemType.DEFENCE_BUFF: {
				return 'var(--bs-red)';
			}
			case ItemType.PYROXENE_BOX: {
				return 'var(--bs-blue)';
			}
			case ItemType.LIGHT_DRONE: {
				return 'var(--bs-yellow';
			}
		}
	}, [itemUnit.type]);

	return (
		<Hexagon size={TILE_SIZE * 0.4} fillColor={color}>
			<Text>{itemUnit.type}</Text>
		</Hexagon>
	);
};

import React, { useMemo } from 'react';
import styled from 'styled-components';
import { ItemType, TILE_SIZE } from '../../../constants';
import { IItemUnit } from '../../../types';
import { Hexagon } from '../Hexagon';

const Text = styled.p`
	font-weight: bold;
	font-size: 1.5em;
	color: #ffffff;
	white-space: nowrap;
`;

interface Props {
	itemUnit: IItemUnit;
}

export const ItemUnit: React.FC<Props> = (props) => {
	const { itemUnit } = props;

	const typeEl = useMemo<React.ReactElement | null>(() => {
		switch (itemUnit.type) {
			case ItemType.HEAL: {
				return <i className="bi bi-plus-circle" />;
			}
			case ItemType.ATTACK_BUFF:
			case ItemType.DEFENCE_BUFF: {
				return <i className="bi bi-arrow-up-circle" />;
			}
			case ItemType.LIGHT_DRONE: {
				return <i className="bi bi-brightness-high" />;
			}
			case ItemType.PYROXENE_BOX: {
				return <i className="bi bi-diamond-fill" />;
			}
		}
	}, [itemUnit.type]);

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
				return 'var(--bs-yellow)';
			}
		}
	}, [itemUnit.type]);

	return (
		<Hexagon size={TILE_SIZE * 0.4} fillColor={color} opacity={0.9}>
			<Text>{typeEl}</Text>
		</Hexagon>
	);
};

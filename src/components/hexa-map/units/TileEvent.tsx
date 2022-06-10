import React, { useMemo } from 'react';
import styled from 'styled-components';
import { TileEventType, TILE_SIZE } from '../../../constants';
import { ITileEvent } from '../../../types';
import { Hexagon } from '../Hexagon';

const Text = styled.p<{ color?: string }>`
	font-weight: bold;
	color: ${(props) => props.color ?? '#ffffff'};
	white-space: nowrap;
`;

interface Props {
	tileEvent: ITileEvent;
}

export const TileEvent: React.FC<Props> = (props) => {
	const { tileEvent } = props;

	const typeStr = useMemo<string>(() => {
		switch (tileEvent.type) {
			case TileEventType.START_TILE: {
				return 'START';
			}
			case TileEventType.BUTTON_TILE: {
				return 'Button';
			}
			case TileEventType.BUTTON_TARGET_TILE: {
				return 'ButtonTarget';
			}
			case TileEventType.WARP_TILE: {
				return 'Wrap';
			}
			case TileEventType.BROKEN_TILE: {
				return 'Broken';
			}
			case TileEventType.SWITCH_TILE: {
				return 'Switch';
			}
			case TileEventType.SWITCH_TARGET_TILE: {
				return 'SwitchTarget';
			}
		}
	}, [tileEvent.type]);

	const color = useMemo<string>(() => {
		switch (tileEvent.type) {
			case TileEventType.START_TILE: {
				return 'var(--bs-yellow)';
			}
			default: {
				return 'var(--bs-cyan)';
			}
		}
	}, [tileEvent.type]);

	if (tileEvent.type === TileEventType.START_TILE) {
		return (
			<Hexagon size={TILE_SIZE * 0.8} strokeColor={color}>
				<Text color={color}>{typeStr}</Text>
			</Hexagon>
		);
	}

	return (
		<Hexagon size={TILE_SIZE * 0.8} fillColor={color}>
			<Text>{typeStr}</Text>
		</Hexagon>
	);
};

import React, { useMemo } from 'react';
import styled from 'styled-components';
import { TileEventType, TILE_SIZE } from '../../../constants';
import { ITileEvent } from '../../../types';
import { Hexagon } from '../Hexagon';

const Text = styled.p<{ color?: string }>`
	font-weight: bold;
	color: ${(props) => props.color ?? '#ffffff'};
	white-space: nowrap;

	& i {
		font-size: 2em;
	}
`;

interface Props {
	tileEvent: ITileEvent;
}

export const TileEvent: React.FC<Props> = (props) => {
	const { tileEvent } = props;

	const typeEl = useMemo<React.ReactElement>(() => {
		switch (tileEvent.type) {
			case TileEventType.START_TILE: {
				return <>START</>;
			}
			case TileEventType.BUTTON_TILE: {
				return <i className="bi bi-circle" />;
			}
			case TileEventType.BUTTON_TARGET_TILE: {
				return <i className="bi bi-slash-circle" />;
			}
			case TileEventType.WARP_TILE: {
				if (!tileEvent.targetEventTileId) {
					return <i className="bi bi-slash-square" />;
				}
				return <i className="bi bi-caret-up-square" />;
			}
			case TileEventType.BROKEN_TILE: {
				return <i className="bi bi-x-square" />;
			}
			case TileEventType.SWITCH_TILE: {
				return <i className="bi bi-code-square" />;
			}
			case TileEventType.SWITCH_TARGET_TILE: {
				return <i className="bi bi-dash-square" />;
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
				<Text color={color}>{typeEl}</Text>
			</Hexagon>
		);
	}

	return (
		<Hexagon size={TILE_SIZE * 0.8} fillColor={color}>
			<Text>{typeEl}</Text>
		</Hexagon>
	);
};

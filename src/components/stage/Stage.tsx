import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AttackType, TileEventType, TILE_SIZE } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
	addPlayerUnit,
	getActivePlayerUnit,
	getEnemyUnits,
	getItemUnits,
	getPlayerUnits,
	getTileEvents,
	getTiles,
	initialize,
	setHexamap,
	updatePlayerUnit,
} from '../../reducers';
import { IHexaMapMetadata, IStageMetadata } from '../../types';
import { getEnumValue, isUnitPositionEquals } from '../../utils';
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

	const [attackType, setAttackType] = useState(AttackType.EXPLOSIVE);

	const activePlayerUnit = useAppSelector(getActivePlayerUnit);

	const tiles = useAppSelector(getTiles);
	const playerUnits = useAppSelector(getPlayerUnits);
	const enemyUnits = useAppSelector(getEnemyUnits);
	const itemUnits = useAppSelector(getItemUnits);
	const tileEvents = useAppSelector(getTileEvents);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(initialize());
		dispatch(setHexamap(hexamap));
	}, [hexamap]);

	useEffect(() => {
		if (!activePlayerUnit) {
			return;
		}
		if (activePlayerUnit.attackType === attackType) {
			return;
		}

		setAttackType(activePlayerUnit.attackType);
	}, [activePlayerUnit]);

	const handleChangeAttackType = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			const attackType = getEnumValue(AttackType)(event.target.value);
			if (!attackType) {
				return;
			}

			setAttackType(attackType);

			if (!activePlayerUnit) {
				return;
			}
			if (activePlayerUnit.attackType === attackType) {
				return;
			}

			dispatch(
				updatePlayerUnit({
					id: activePlayerUnit.id,
					attackType,
				})
			);
		},
		[activePlayerUnit]
	);

	const handleClickTile = useCallback(
		(tileId: number) => {
			const tile = tiles.find((x) => x.id === tileId);
			if (!tile) {
				return;
			}

			const tileEvent = tileEvents.find(isUnitPositionEquals(tile.position));
			if (!tileEvent) {
				return;
			}

			if (tileEvent.type === TileEventType.START_TILE) {
				const playerUnit = playerUnits.find(isUnitPositionEquals(tileEvent.position));
				if (playerUnit) {
					return;
				}

				dispatch(
					addPlayerUnit({
						attackType,
						position: tileEvent.position,
					})
				);
			}
		},
		[tiles, tileEvents, playerUnits]
	);

	return (
		<>
			<div className="row">
				<HexamapWrapper className="col">
					<HexaMap
						tiles={tiles}
						playerUnits={playerUnits}
						enemyUnits={enemyUnits}
						itemUnits={itemUnits}
						tileEvents={tileEvents}
						onClickTile={handleClickTile}
					/>
				</HexamapWrapper>
			</div>
			{activePlayerUnit && (
				<div className="row">
					<div className="col">
						<form className="form-inline">
							<div className="form-group">
								<label htmlFor="attack_type">attack type</label>
								<select
									className="form-control"
									name="attack_type"
									value={attackType}
									onChange={handleChangeAttackType}
								>
									{Object.values(AttackType).map((x) => (
										<option key={x} value={x}>
											{x}
										</option>
									))}
								</select>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
};

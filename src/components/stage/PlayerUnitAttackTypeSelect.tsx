import { getEnumValue } from '@sapphire-sh/utils';
import React, { useMemo } from 'react';
import { AttackType, LocalizationKey, LocalizationTable } from '../../constants';
import { useAppSelector } from '../../hooks';
import { getLanguageCode } from '../../reducers';
import { getAttackTypeLocalizationKey } from '../../utils';
import { List } from '../list';

interface Props {
	attackType: AttackType;
	onChange: (attackType: AttackType) => void;
}

export const PlayerUnitAttackTypeSelect: React.FC<Props> = (props) => {
	const { attackType, onChange } = props;

	const languageCode = useAppSelector(getLanguageCode);

	const options = useMemo(() => {
		return Object.values(AttackType).map((attackType) => {
			const key = getAttackTypeLocalizationKey(attackType);
			return {
				label: LocalizationTable[key][languageCode],
				value: attackType,
			};
		});
	}, [languageCode]);

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const attackType = getEnumValue(AttackType)(event.target.value);
		if (!attackType) {
			return;
		}

		onChange(attackType);
	};

	return (
		<div className="row">
			<div className="col">
				<List titleKey={LocalizationKey.ATTACK_TYPE}>
					<div className="list-group-item">
						<select className="form-control" name="attack_type" value={attackType} onChange={handleChange}>
							{options.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</div>
				</List>
			</div>
		</div>
	);
};

import React from 'react';
import { LanguageCode, LocalizationKey } from '../../constants';
import { useAppSelector, useTranslation } from '../../hooks';
import { getLanguageCode } from '../../reducers';

interface IProps {
	languageCode: LanguageCode;
	onClick: () => void;
}

export const LanguageItem: React.FC<IProps> = (props) => {
	const { languageCode, onClick } = props;

	const appLanguageCode = useAppSelector(getLanguageCode);
	const label = useTranslation(LocalizationKey.LANGUAGES, { forceLanguageCode: languageCode });

	const handleClick = () => {
		onClick();
	};

	return (
		<li key={languageCode}>
			<p className={`dropdown-item ${languageCode === appLanguageCode && 'current'}`} onClick={handleClick}>
				{label}
			</p>
		</li>
	);
};

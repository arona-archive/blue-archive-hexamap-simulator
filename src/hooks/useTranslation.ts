import { useMemo } from 'react';
import { emptyText, LanguageCode, LocalizationTextKey, LocalizationTextTable } from '../constants';
import { getLanguageCode } from '../reducers';
import { IText } from '../types';
import { useAppSelector } from './useAppSelector';

export const useTranslation = (
	key?: (LocalizationTextKey | IText) | (() => LocalizationTextKey | IText),
	languageCode?: LanguageCode
) => {
	const appLanguageCode = useAppSelector(getLanguageCode);

	const _languageCode = useMemo(() => {
		return languageCode ?? appLanguageCode;
	}, [languageCode, appLanguageCode]);

	const _key = useMemo(() => {
		if (typeof key === 'function') {
			return key();
		}
		return key;
	}, [key]);

	const text = useMemo<IText>(() => {
		if (typeof _key === 'number') {
			return LocalizationTextTable[_key] ?? emptyText;
		}
		return _key ?? emptyText;
	}, [_key]);

	return useMemo(() => text[_languageCode], [text, languageCode]);
};

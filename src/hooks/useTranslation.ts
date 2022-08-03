import { useMemo } from 'react';
import { emptyText, LanguageCode, LocalizationKey, LocalizationTable } from '../constants';
import { getLanguageCode } from '../reducers';
import { IText } from '../types';
import { useAppSelector } from './useAppSelector';

export const useTranslation = (
	key?: (LocalizationKey | IText) | (() => LocalizationKey | IText),
	forceLanguageCode?: LanguageCode
) => {
	const languageCode = useAppSelector(getLanguageCode);

	const memoizedLanguageCode = useMemo(() => {
		return forceLanguageCode ?? languageCode;
	}, [languageCode, forceLanguageCode]);

	const memoizedKey = useMemo(() => {
		if (typeof key === 'function') {
			return key();
		}
		return key;
	}, [key]);

	const text = useMemo<IText>(() => {
		if (typeof memoizedKey === 'number') {
			return LocalizationTable[memoizedKey] ?? emptyText;
		}
		return memoizedKey ?? emptyText;
	}, [memoizedKey]);

	return useMemo(() => text[memoizedLanguageCode], [text, memoizedLanguageCode]);
};

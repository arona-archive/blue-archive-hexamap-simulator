import { useMemo } from 'react';
import { emptyText, LanguageCode, LocalizationKey, LocalizationTable } from '../constants';
import { getLanguageCode } from '../reducers';
import { IText } from '../types';
import { useAppSelector } from './useAppSelector';

export const useTranslation = (
	key?: (LocalizationKey | IText) | (() => LocalizationKey | IText),
	options?: {
		parameters?: (number | string)[];
		forceLanguageCode?: LanguageCode;
	}
) => {
	const languageCode = useAppSelector(getLanguageCode);

	const memoizedLanguageCode = useMemo(() => {
		return options?.forceLanguageCode ?? languageCode;
	}, [languageCode, options?.forceLanguageCode]);

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

	const populatedText = useMemo(() => {
		let tempText = text[memoizedLanguageCode];
		const parameters = options?.parameters ?? [];
		for(let i = 0; i < parameters.length; ++i) {
			tempText = tempText.replace(`{${i}}`, `${parameters[i] ?? ''}`);
		}
		return tempText;
	}, [text, options?.parameters, memoizedLanguageCode]);

	return populatedText;
};

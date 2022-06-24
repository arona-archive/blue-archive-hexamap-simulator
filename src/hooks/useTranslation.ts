import { useMemo } from 'react';
import { emptyText } from '../constants';
import { getLanguageCode } from '../reducers';
import { IText } from '../types';
import { useAppSelector } from './useAppSelector';

export const useTranslation = (text?: IText | (() => IText | undefined)) => {
	const languageCode = useAppSelector(getLanguageCode);

	const _text = useMemo<IText>(() => {
		if (typeof text === 'function') {
			return text() ?? emptyText;
		}
		return text ?? emptyText;
	}, [text]);

	return useMemo(() => _text[languageCode], [_text, languageCode]);
};

import { getEnumValue } from '@sapphire-sh/utils';
import { AttackType, emptyText, LanguageCode, LocalizationKey, LocalStorageKey } from '../constants';
import { IText } from '../types';

const pr = new Intl.PluralRules('en-US', { type: 'ordinal' });
const suffixes = new Map<Intl.LDMLPluralRule, string>([
	['one', 'st'],
	['two', 'nd'],
	['few', 'rd'],
	['other', 'th'],
]);

const getOrdinalNumeralText = (value: number): string => {
	const rule = pr.select(value);
	const suffix = suffixes.get(rule);
	return `${value}${suffix}`;
};

export const getCampaignName = (campaignId: number): IText => {
	const p = (campaignId % 100) / 10;

	return {
		en: `${getOrdinalNumeralText(p)} Mission`,
		ko: `제 ${p}임무`,
		ja: `第${p}任務`,
	};
};

export const getStageName = (stageId: number): IText => {
	const p = (Math.floor(stageId / 1000) % 100) / 10;
	const q = Math.floor(stageId / 100) % 10;
	const r = stageId % 100;

	if (q === 1) {
		return {
			en: `${p}-${r}`,
			ko: `${p}-${r}`,
			ja: `${p}-${r}`,
		};
	}
	if (q === 2) {
		return {
			en: `${p}-${r} Hard`,
			ko: `${p}-${r} Hard`,
			ja: `${p}-${r} Hard`,
		};
	}
	if (q === 3) {
		return {
			en: `Challenge ${`${r}`.padStart(2, '0')}`,
			ko: `챌린지 ${`${r}`.padStart(2, '0')}`,
			ja: `チャレンジ ${`${r}`.padStart(2, '0')}`,
		};
	}

	return emptyText;
};

const getBrowserLanguageCode = (): LanguageCode | null => {
	for (const language of window.navigator.languages) {
		const languageCode = getEnumValue(LanguageCode)(language);
		if (!languageCode) {
			continue;
		}

		return languageCode;
	}

	return null;
};

const getLocalStorageLanguageCode = (): LanguageCode | null => {
	const languageCode = window.localStorage.getItem(LocalStorageKey.LANGUAGE_CODE);
	if (!languageCode) {
		return null;
	}

	return getEnumValue(LanguageCode)(languageCode);
};

export const getDefaultLanguageCode = (): LanguageCode => {
	{
		const languageCode = getLocalStorageLanguageCode();
		if (languageCode) {
			return languageCode;
		}
	}

	{
		const languageCode = getBrowserLanguageCode();
		if (languageCode) {
			return languageCode;
		}
	}

	return LanguageCode.JA;
};

export const getDefaultDebugFlag = (): boolean => {
	const params = new URLSearchParams(window.location.search);
	return params.has('debug');
};

export const getAttackTypeLocalizationKey = (attackType: AttackType): LocalizationKey => {
	switch (attackType) {
		case AttackType.EXPLOSIVE: {
			return LocalizationKey.ATTACK_TYPE_EXPLOSIVE;
		}
		case AttackType.PIERCING: {
			return LocalizationKey.ATTACK_TYPE_PIERCING;
		}
		case AttackType.MYSTIC: {
			return LocalizationKey.ATTACK_TYPE_MYSTIC;
		}
	}
};

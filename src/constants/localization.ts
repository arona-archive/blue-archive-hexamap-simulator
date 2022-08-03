import { IText } from '../types';

export enum LocalizationKey {
	LANGUAGES,
	HOME,
	CAMPAIGNS,
	EVENTS,
	NORMAL,
	HARD,
	QUEST,
	CHALLENGE,
	CAMPAIGN_NAME,
	CAMPAIGN_STAGE_NAME,
	EVENT_NAME,
	EVENT_STAGE_NAME,
	STAGE_ACTIONS,
}

export const emptyText: IText = {
	en: '',
	ko: '',
	ja: '',
};

export const LocalizationTable: Record<LocalizationKey, IText> = {
	[LocalizationKey.LANGUAGES]: {
		en: 'English',
		ko: '한국어',
		ja: '日本語',
	},
	[LocalizationKey.HOME]: {
		en: 'Home',
		ko: '홈',
		ja: 'トップ',
	},
	[LocalizationKey.CAMPAIGNS]: {
		en: 'Missions',
		ko: '임무',
		ja: '任務',
	},
	[LocalizationKey.EVENTS]: {
		en: 'Events',
		ko: '이벤트',
		ja: 'イベント',
	},
	[LocalizationKey.NORMAL]: {
		en: 'Normal Missions',
		ko: 'Normal 임무',
		ja: '任務（Normal）',
	},
	[LocalizationKey.HARD]: {
		en: 'Hard Missions',
		ko: 'Hard 임무',
		ja: '任務（Hard）',
	},
	[LocalizationKey.QUEST]: {
		en: 'Quests',
		ko: '퀘스트',
		ja: 'Quest',
	},
	[LocalizationKey.CHALLENGE]: {
		en: 'Challenges',
		ko: '챌린지',
		ja: 'Challenge',
	},
	[LocalizationKey.CAMPAIGN_NAME]: emptyText, // TODO: handle localization with parameters
	[LocalizationKey.CAMPAIGN_STAGE_NAME]: emptyText, // TODO: handle localization with parameters
	[LocalizationKey.EVENT_NAME]: emptyText, // TODO: handle localization with parameters
	[LocalizationKey.EVENT_STAGE_NAME]: emptyText, // TODO: handle localization with parameters
	[LocalizationKey.STAGE_ACTIONS]: {
		en: 'stage actions',
		ko: 'stage actions',
		ja: 'stage actions',
	},
};

export const EventNameLocalizationTable: Record<number, IText> = {
	214: {
		en: 'アビドスリゾート復旧対策委員会',
		ko: 'アビドスリゾート復旧対策委員会',
		ja: 'アビドスリゾート復旧対策委員会',
	},
};

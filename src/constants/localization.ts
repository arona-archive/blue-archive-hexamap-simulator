import { IText } from '../types';

export enum LocalizationTextKey {
	LANGUAGES = 0,
	HOME = 1,
	CAMPAIGNS = 11,
	EVENTS = 12,
	NORMAL = 21,
	HARD = 22,
	QUEST = 23,
	CHALLENGE = 24,
	EVENT_214 = 214,
}

export const emptyText: IText = {
	en: '',
	ko: '',
	ja: '',
};

export const LocalizationTextTable: Record<LocalizationTextKey, IText> = {
	[LocalizationTextKey.LANGUAGES]: {
		en: 'English',
		ko: '한국어',
		ja: '日本語',
	},
	[LocalizationTextKey.HOME]: {
		en: 'Home',
		ko: '홈',
		ja: 'トップ',
	},
	[LocalizationTextKey.CAMPAIGNS]: {
		en: 'Missions',
		ko: '임무',
		ja: '任務',
	},
	[LocalizationTextKey.EVENTS]: {
		en: 'Events',
		ko: '이벤트',
		ja: 'イベント',
	},
	[LocalizationTextKey.NORMAL]: {
		en: 'Normal Missions',
		ko: 'Normal 임무',
		ja: '任務（Normal）',
	},
	[LocalizationTextKey.HARD]: {
		en: 'Hard Missions',
		ko: 'Hard 임무',
		ja: '任務（Hard）',
	},
	[LocalizationTextKey.QUEST]: {
		en: 'Quests',
		ko: '퀘스트',
		ja: 'Quest',
	},
	[LocalizationTextKey.CHALLENGE]: {
		en: 'Challenges',
		ko: '챌린지',
		ja: 'Challenge',
	},
	[LocalizationTextKey.EVENT_214]: {
		en: 'アビドスリゾート復旧対策委員会',
		ko: 'アビドスリゾート復旧対策委員会',
		ja: 'アビドスリゾート復旧対策委員会',
	},
};

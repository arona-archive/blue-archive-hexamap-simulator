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
	MISSION_OBJECTIVES,
	MISSION_COMPLETE,
	MISSION_S_RANK_COUNT,
	MISSION_TURN_COUNT,
	ATTACK_TYPE,
	ATTACK_TYPE_EXPLOSIVE,
	ATTACK_TYPE_PIERCING,
	ATTACK_TYPE_MYSTIC,
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
	[LocalizationKey.MISSION_OBJECTIVES]: {
		en: 'Mission Objectives',
		ko: '임무 목표',
		ja: '任務目標',
	},
	[LocalizationKey.MISSION_COMPLETE]: {
		en: 'Mission Complete',
		ko: '임무 완료',
		ja: '任務完了',
	},
	[LocalizationKey.MISSION_S_RANK_COUNT]: {
		en: 'Acquire S rank {0}/{1} time(s).',
		ko: 'S랭크 {0}/{1}회 획득',
		ja: 'Sランクを{0}/{1}回獲得',
	},
	[LocalizationKey.MISSION_TURN_COUNT]: {
		en: 'Clear stage within {0}/{1} turn(s).',
		ko: '{0}/{1}턴 내 스테이지 클리어',
		ja: '{0}/{1}ターン以内にステージクリア',
	},
	[LocalizationKey.ATTACK_TYPE]: {
		en: 'Attack Type',
		ko: '공격 타입',
		ja: '攻撃タイプ',
	},
	[LocalizationKey.ATTACK_TYPE_EXPLOSIVE]: {
		en: 'Explosive',
		ko: '폭발',
		ja: '爆発',
	},
	[LocalizationKey.ATTACK_TYPE_PIERCING]: {
		en: 'Piercing',
		ko: '관통',
		ja: '貫通',
	},
	[LocalizationKey.ATTACK_TYPE_MYSTIC]: {
		en: 'Mystic',
		ko: '신비',
		ja: '神秘',
	},
};

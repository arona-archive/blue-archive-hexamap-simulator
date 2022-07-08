import { IText } from '../types';

export const emptyText: IText = {
	en: '',
	ko: '',
	ja: '',
};

export const LocalizationTextTable = {
	language: {
		en: 'English',
		ko: '한국어',
		ja: '日本語',
	},
	main_page: {
		en: 'Home',
		ko: '홈',
		ja: 'トップ',
	},
};

export const MetadataLocalizationTextTable: Record<number, IText> = {
	1: {
		en: 'Missions',
		ko: '임무',
		ja: '任務',
	},
	2: {
		en: 'Events',
		ko: '이벤트',
		ja: 'イベント',
	},
	214: {
		en: 'アビドスリゾート復旧対策委員会',
		ko: 'アビドスリゾート復旧対策委員会',
		ja: 'アビドスリゾート復旧対策委員会',
	},
};

import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { APP_TITLE, LocalizationKey } from '../../constants';
import { useAppSelector, useTranslation } from '../../hooks';
import { getLanguageCode } from '../../reducers';
import { IBreadcrumb } from '../../types';
import { getCampaignName, getEventName, getStageName } from '../../utils';

interface IProps {
	breadcrumb: IBreadcrumb;
	active?: boolean;
}

export const Breadcrumb: React.FC<IProps> = (props) => {
	const { breadcrumb, active = false } = props;

	const languageCode = useAppSelector(getLanguageCode);

	const text = useTranslation(breadcrumb.localizationKey);

	// FIXME: handle localization with parameters
	const _text = useMemo(() => {
		const { path, localizationKey } = breadcrumb;

		switch (localizationKey) {
			case LocalizationKey.CAMPAIGN_NAME: {
				const campaignId = parseInt(path.split('/')[2] ?? '', 10);
				return getCampaignName(campaignId)[languageCode];
			}
			case LocalizationKey.EVENT_NAME: {
				const eventId = parseInt(path.split('/')[2] ?? '', 10);
				return getEventName(eventId)[languageCode];
			}
			case LocalizationKey.CAMPAIGN_STAGE_NAME:
			case LocalizationKey.EVENT_STAGE_NAME: {
				const stageId = parseInt(path.split('/')[3] ?? '', 10);
				return getStageName(stageId)[languageCode];
			}
			default: {
				return text;
			}
		}
	}, [languageCode, breadcrumb, text]);

	const siteTitle = useMemo(() => `${APP_TITLE} | ${_text}`, [_text]);

	return (
		<>
			{active && <Helmet>{siteTitle}</Helmet>}
			<li className={`breadcrumb-item ${active && 'active'}`}>
				{active ? _text : <Link to={breadcrumb.path}>{_text}</Link>}
			</li>
		</>
	);
};

import React from 'react';
import { toast } from 'react-toastify';
import { STAGE_ACTIONS_SHARE_PREFIX } from '../../constants';
import { ShareHelper } from '../../helpers';
import { useAppSelector } from '../../hooks';
import { getStageActions } from '../../reducers';

export const ShareButton: React.FC = () => {
	const stageActions = useAppSelector(getStageActions);

	const handleClick = async () => {
		const helper = new ShareHelper();
		const data = helper.encode(stageActions);
		const hash = `${STAGE_ACTIONS_SHARE_PREFIX}${data}`;
		const baseUrl = `${window.location.origin}${window.location.pathname}`;
		const url = `${baseUrl}${hash}`;
		await window.navigator.clipboard.writeText(url);
		toast.info('URL copied to clipboard');
	};

	return (
		<button type="button" className="btn btn-outline-primary w-100" onClick={handleClick}>
			share
		</button>
	);
};

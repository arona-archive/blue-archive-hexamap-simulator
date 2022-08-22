import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from '../../hooks';
import { IStageStars } from '../../types';
import { getStageName } from '../../utils';

const Root = styled(Link)`
	& > :not(:first-child) {
		margin-left: 8px;
	}
`;

interface Props {
	campaignId: number;
	stageId: number;
	stars?: IStageStars;
}

export const CampaignStageEntry: React.FC<Props> = (props) => {
	const { campaignId, stageId, stars = [false, false, false] } = props;

	const stageName = useTranslation(getStageName(stageId));

	return (
		<Root className="list-group-item" to={`/campaign/${campaignId}/${stageId}`}>
			<span>{stars.map((star) => (star ? '⭐️' : '☆'))}</span>
			<span>{stageName}</span>
		</Root>
	);
};

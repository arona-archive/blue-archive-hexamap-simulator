import React from 'react';
import styled from 'styled-components';

const StarWrapper = styled.span`
	margin-right: 8px;
`;

interface Props {
	hidden: boolean;
	label: string;
}

export const MissionObjectiveListEntry: React.FC<Props> = (props) => {
	const { hidden, label } = props;

	return (
		<div className="list-group-item">
			<StarWrapper>{hidden ? '☆' : '⭐️'}</StarWrapper>
			<span>{label}</span>
		</div>
	);
};

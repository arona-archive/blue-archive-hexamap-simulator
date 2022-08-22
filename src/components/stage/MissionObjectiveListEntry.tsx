import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
	user-select: none;
`;

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
		<Root className="list-group-item">
			<StarWrapper>{hidden ? '☆' : '⭐️'}</StarWrapper>
			<span>{label}</span>
		</Root>
	);
};

import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
	user-select: none;
`;

interface IProps {
	title: string;
}

export const ListHeader: React.FC<IProps> = (props) => {
	const { title } = props;

	return <Root className="list-group-item list-group-item-primary">{title}</Root>;
};

import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { matchPath, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '../../routes';

const Header = styled.h5`
	user-select: none;
`;

const Container = styled.div`
	margin-top: 24px;
	margin-bottom: 24px;

	& > * {
		margin-top: 12px;
	}
`;

interface Props {
	title: string;
	children?: React.ReactNode;
}

export const Page: React.FC<Props> = (props) => {
	const location = useLocation();

	const siteTitle = useMemo(() => {
		const title = 'blue-archive-hexamap-simulator';
		const subTitle = routes.find((x) => !!matchPath(x.path, location.pathname))?.name;
		return subTitle ? `${title} | ${subTitle}` : title;
	}, [location]);

	return (
		<>
			<Helmet>
				<title>{siteTitle}</title>
			</Helmet>
			<div className="container-lg">
				<Header>{props.title}</Header>
				<Container>{props.children}</Container>
			</div>
		</>
	);
};

import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { matchPath, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks';
import { getLanguageCode } from '../../reducers';
import { routes } from '../../routes';
import { INavigationPath } from '../../types';

const Root = styled.div`
	margin-top: 24px;
`;

const Breadcrumbs = styled.nav`
	user-select: none;
	--bs-breadcrumb-divider: '>';
`;

const Container = styled.div`
	margin-top: 24px;
	margin-bottom: 24px;

	& > * {
		margin-top: 12px;
	}
`;

interface Props {
	breadcrumbs: INavigationPath[];
	children?: React.ReactNode;
}

export const Page: React.FC<Props> = (props) => {
	const { breadcrumbs } = props;

	const languageCode = useAppSelector(getLanguageCode);

	const location = useLocation();

	const siteTitle = useMemo(() => {
		const title = 'blue-archive-hexamap-simulator';
		const subTitle = routes.find((x) => !!matchPath(x.path, location.pathname))?.name;
		return subTitle ? `${title} | ${subTitle}` : title;
	}, [location]);

	const bredcrumbItems = useMemo(() => {
		return breadcrumbs.map((breadcrumb, index) => ({
			key: index,
			label: breadcrumb.name[languageCode],
			path: breadcrumb.path,
		}));
	}, [breadcrumbs, languageCode]);

	return (
		<Root className="container-lg">
			<Helmet>
				<title>{siteTitle}</title>
			</Helmet>
			<Breadcrumbs aria-label="breadcrumb">
				<ol className="breadcrumb">
					{bredcrumbItems.map((bredcrumbItem, index) =>
						bredcrumbItems.length - 1 === index ? (
							<li key={bredcrumbItem.key} className="breadcrumb-item active">
								{bredcrumbItem.label}
							</li>
						) : (
							<li key={index} className="breadcrumb-item">
								<a href={bredcrumbItem.path}>{bredcrumbItem.label}</a>
							</li>
						)
					)}
				</ol>
			</Breadcrumbs>
			<Container>{props.children}</Container>
		</Root>
	);
};

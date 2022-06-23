import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { matchPath, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '../../routes';
import { IBreadcrumbItem } from '../../types';

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
	breadcrumbs: IBreadcrumbItem[];
	children?: React.ReactNode;
}

export const Page: React.FC<Props> = (props) => {
	const { breadcrumbs } = props;

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
				<Breadcrumbs aria-label="breadcrumb">
					<ol className="breadcrumb">
						{breadcrumbs.map((breadcrumb, index) =>
							breadcrumbs.length - 1 === index ? (
								<li key={index} className="breadcrumb-item active">
									{breadcrumb.name}
								</li>
							) : (
								<li key={index} className="breadcrumb-item">
									<a href={breadcrumb.path}>{breadcrumb.name}</a>
								</li>
							)
						)}
					</ol>
				</Breadcrumbs>
				<Container>{props.children}</Container>
			</div>
		</>
	);
};

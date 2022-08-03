import React, { useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks';
import { getLanguageCode } from '../../reducers';
import { routes } from '../../routes';
import { IBreadcrumb } from '../../types';
import { Breadcrumb } from './Breadcrumb';

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
	children?: React.ReactNode;
}

export const Page: React.FC<Props> = (props) => {
	const languageCode = useAppSelector(getLanguageCode);

	const location = useLocation();

	const breadcrumbs = useMemo<IBreadcrumb[]>(() => {
		const breadcrumbs: IBreadcrumb[] = [];

		let pathname = location.pathname;
		while (true) {
			const route = routes.find((route) => matchPath(route.path, pathname));
			if (route) {
				const breadcrumb: IBreadcrumb = {
					active: pathname === location.pathname,
					path: pathname,
					localizationKey: route.localizationKey,
				};
				breadcrumbs.push(breadcrumb);
			}

			if (pathname === '/') {
				break;
			}

			const index = pathname.lastIndexOf('/');
			if (index === 0) {
				pathname = '/';
				continue;
			}
			pathname = pathname.slice(0, index);
		}

		return breadcrumbs.reverse();
	}, [languageCode]);

	return (
		<Root className="container-lg">
			<Breadcrumbs aria-label="breadcrumb">
				<ol className="breadcrumb">
					{breadcrumbs.map((breadcrumb, index) => (
						<Breadcrumb key={breadcrumb.path} breadcrumb={breadcrumb} active={breadcrumbs.length - 1 === index} />
					))}
				</ol>
			</Breadcrumbs>
			<Container>{props.children}</Container>
		</Root>
	);
};

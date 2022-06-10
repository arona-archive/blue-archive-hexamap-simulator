import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

const Root = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	user-select: none;
`;

const Svg = styled.svg<{ active: boolean; hover: boolean; clickable: boolean; hidden: boolean; strokeColor?: string }>`
	position: absolute;
	overflow: visible;
	${(props) => (props.clickable ? 'cursor: pointer;' : 'pointer-events: none;')}

	& > polygon {
		stroke-width: 4px;
		${(props) => props.strokeColor && `stroke: ${props.strokeColor}`};
		${(props) => props.hover && 'fill: #eeeeee;'}
		${(props) => props.active && 'fill: #cccccc;'}
		${(props) => props.hidden && 'stroke-dasharray: 8,2;'}
	}
`;

const Container = styled.div`
	position: absolute;
	pointer-events: none;
`;

interface Props {
	size: number;
	strokeColor?: string;
	fillColor?: string;
	active?: boolean;
	clickable?: boolean;
	hidden?: boolean;
	onHover?: () => void;
	onClick?: () => void;
	children?: React.ReactNode;
}

export const Hexagon: React.FC<Props> = (props) => {
	const {
		size,
		strokeColor,
		fillColor = 'none',
		active = false,
		clickable = false,
		hidden = false,
		onHover,
		onClick,
		children,
	} = props;

	const [hover, setHover] = useState(false);

	const points = useMemo(() => {
		const p = size / Math.sqrt(3) / 2;

		return [
			{ x: size / 2, y: size / 2 - p * 2 },
			{ x: size, y: size / 2 - p },
			{ x: size, y: size / 2 + p },
			{ x: size / 2, y: size / 2 + p * 2 },
			{ x: 0, y: size / 2 + p },
			{ x: 0, y: size / 2 - p },
		];
	}, [size]);

	const pointsStr = useMemo(() => {
		if (!points[0]) {
			return '';
		}
		return [...points, points[0]].map((x) => `${x.x},${x.y}`).join(' ');
	}, [points]);

	const handleMouseEnter = () => {
		setHover(true);
		if (!onHover) {
			return;
		}
		onHover();
	};

	const handleMouseLeave = () => {
		setHover(false);
	};

	const handleClick = () => {
		if (!onClick) {
			return;
		}
		onClick();
	};

	return (
		<Root>
			<Svg
				active={active}
				hover={hover}
				clickable={clickable}
				hidden={hidden}
				width={size}
				height={size}
				strokeColor={strokeColor}
				onClick={handleClick}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<polygon points={pointsStr} fill={fillColor} />
			</Svg>
			<Container>{children}</Container>
		</Root>
	);
};

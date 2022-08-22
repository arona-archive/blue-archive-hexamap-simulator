import React from 'react';

interface Props {
	onClick: () => void;
}

export const PlayerUnitTriggerWrapButton: React.FC<Props> = (props) => {
	const { onClick } = props;

	const handleClick = (event: React.MouseEvent) => {
		onClick();
	};

	return (
		<button className="btn btn-outline-primary w-100" onClick={handleClick}>
			trigger warp
		</button>
	);
};

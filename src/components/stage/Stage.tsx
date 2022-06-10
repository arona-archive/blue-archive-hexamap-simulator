import React, { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { initialize, setHexamap } from '../../reducers';
import { IHexaMapMetadata, IStageMetadata } from '../../types';

interface Props {
	stage: IStageMetadata;
	hexamap: IHexaMapMetadata;
}

export const Stage: React.FC<Props> = (props) => {
	const { stage, hexamap } = props;

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(initialize());
		dispatch(setHexamap(hexamap));
	}, [hexamap]);

	return (
		<div className="row">
			<pre>{JSON.stringify(stage, null, 2)}</pre>
			<pre>{JSON.stringify(hexamap, null, 2)}</pre>
		</div>
	);
};

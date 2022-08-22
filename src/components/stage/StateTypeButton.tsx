import React from 'react';
import { StateType } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getStateType, setStateType } from '../../reducers';

interface Props {
	disabled: boolean;
}

export const StateTypeButton: React.FC<Props> = (props) => {
	const { disabled } = props;

	const stateType = useAppSelector(getStateType);

	const dispatch = useAppDispatch();

	const handleClickEdit = () => {
		dispatch(setStateType(StateType.EDIT));
	};

	const handleClickReplay = () => {
		dispatch(setStateType(StateType.REPLAY));
	};

	switch (stateType) {
		case StateType.EDIT: {
			return (
				<button type="button" className="btn btn-outline-primary w-100" disabled={disabled} onClick={handleClickReplay}>
					replay
				</button>
			);
		}
		case StateType.REPLAY: {
			return (
				<button type="button" className="btn btn-outline-primary w-100" onClick={handleClickEdit}>
					edit
				</button>
			);
		}
	}
};

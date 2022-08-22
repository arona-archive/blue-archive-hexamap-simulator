import { STAGE_ACTIONS_VERSION } from '../constants';
import { IStageAction } from '../types';

export class ShareHelper {
	public encode(stageActions: IStageAction[]): string {
		const p = JSON.stringify({
			version: STAGE_ACTIONS_VERSION,
			data: stageActions,
		});
		const q = encodeURIComponent(window.btoa(p));
		return q;
	}

	public decode(data: string): IStageAction[] {
		try {
			const p = window.atob(decodeURIComponent(data));
			const q = JSON.parse(p);
			return q.data;
		} catch (error) {
			console.error(error);
			return [];
		}
	}
}

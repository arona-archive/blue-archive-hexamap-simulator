import { StageState } from '../reducers';

export class StageHelper {
	public constructor(private readonly state: StageState) {}

	private initialize() {}

	public process() {
		this.initialize();
	}
}

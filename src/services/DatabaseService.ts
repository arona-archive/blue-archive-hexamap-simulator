import { DBSchema, IDBPDatabase, openDB } from 'idb';
import { DATABASE_NAME } from '../constants';
import { IStageAction, IStageSolution } from '../types';

interface DatabaseSchema extends DBSchema {
	stageActions: {
		key: number;
		value: IStageSolution;
		indexes: { stageId: number };
	};
}

export class DatabaseService {
	private static instance: DatabaseService;
	private db?: IDBPDatabase<DatabaseSchema>;

	constructor() {
		if (!DatabaseService.instance) {
			DatabaseService.instance = this;
		}
		return DatabaseService.instance;
	}

	async initialize() {
		this.db = await openDB<DatabaseSchema>(DATABASE_NAME, 1, {
			upgrade: (db) => {
				const objectStore = db.createObjectStore('stageActions', { keyPath: 'stageId' });
				objectStore.createIndex('stageId', 'stageId', { unique: true });
			},
		});
	}

	async setStageSolution(stageId: number, stageActions: IStageAction[], stars: [boolean, boolean, boolean]) {
		return this.db?.put('stageActions', {
			stageId,
			stageActions,
			stars,
		});
	}

	async getStageSolutions() {
		return this.db?.getAll('stageActions');
	}

	async getStageSolution(stageId: number) {
		return this.db?.get('stageActions', stageId);
	}
}

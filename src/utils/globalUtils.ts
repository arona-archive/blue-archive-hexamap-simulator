export const findLastIndex = <T>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean): number => {
	for (let i = array.length - 1; i >= 0; --i) {
		const e = array[i];
		if (!e) {
			continue;
		}
		if (predicate(e, i, array)) {
			return i;
		}
	}
	return -1;
};

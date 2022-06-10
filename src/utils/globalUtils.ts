export const getEnumValue = <T extends string, TEnum extends string>(value: { [key in T]: TEnum }) => {
	const enumValues = Object.values(value);
	return (value?: string): TEnum | null => (enumValues.includes(value) ? (value as TEnum) : null);
};

export const isNotNullable = <T extends object>(value: T | undefined): value is NonNullable<T> => {
	return !!value;
};

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

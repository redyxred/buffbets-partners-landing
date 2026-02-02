import "server-only";

import type RuDict from "./ru.json";

const dictionaries = {
	en: () => import("./en.json").then((mod) => mod.default),
	ru: () => import("./ru.json").then((mod) => mod.default),
};

export type Locale = keyof typeof dictionaries;
export type Dict = typeof RuDict;

export const getDictionary = async (locale: string): Promise<Dict> => {
	const loadDictionary = dictionaries[locale as Locale];

	if (loadDictionary) {
		return loadDictionary() as Promise<Dict>;
	}

	return dictionaries["en"]() as Promise<Dict>;
};

import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/en";
import en from "./dictionaries/en";
import th from "./dictionaries/th";
import my from "./dictionaries/my";
import lo from "./dictionaries/lo";
import km from "./dictionaries/km";
import vi from "./dictionaries/vi";

const dictionaries: Record<Locale, Dictionary> = { en, th, my, lo, km, vi };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en;
}

export type { Dictionary };

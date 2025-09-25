import { NativeName } from "@/types/countries";
import { Currencies, Languages } from "@/types/country";

type FilterValueType = NativeName | Currencies | Languages | string[]

export const filterValue = (value: FilterValueType): string | string[] => {
    if (!value) return "N/A";

  // Case 1: string[]
  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : "N/A";
  }

  // Case 2: object (NativeName, Currencies, Languages)
  const commons = Object.values(value)
    .map((entry: { common?: string; name?: string; tld?: string; capital?: string }) => {
      if (typeof entry === "string") return entry; // <-- handle Languages
      return entry?.common || entry?.name || entry?.tld || entry?.capital;
    })
    .filter(Boolean)
    .join(", ");

  return commons || "N/A";
};

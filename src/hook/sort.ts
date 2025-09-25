import { CountriesType } from "@/types/countries";

export default function sortData(data: CountriesType[]) {
  if (!data) return;

  data.sort(function (a, b) {
    if (a.name.common < b.name.common) {
      return -1;
    }
    if (a.name.common > b.name.common) {
      return 1;
    }
    return 0;
  });
}

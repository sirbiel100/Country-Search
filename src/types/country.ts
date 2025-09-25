import { CountriesType } from "./countries";

export type Currencies = {
  [key: string]: {
    name: string;
  };
};

export type Languages = {
  [key: string]: string;
};

export interface CountryDetailsInterface extends CountriesType {
  subregion: string;
  tld: string[];
  currencies: Currencies;
  languages: Languages;
  borders: string[];
}

export interface Country {
  name: string;
  flag: string;
  population: number;
  region: string;
  timezone: string;
  languages: string;
  currencies: string;
  capital: string;
}

  
  export type CountryAll = {
    flags: {
      png: string;
      svg: string;
      alt?: string;
    };
    name: {
      common: string;
      official: string;
      nativeName?: Record<string, { official: string; common: string }>;
    };
    currencies: Record<string, { name: string; symbol: string }>;
    capital: string[];
    region: string;
    population: number;
    timezones: string[];
    languages: Record<string, string>;
  };
  
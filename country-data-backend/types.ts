export interface Country {
    flags: Flag;
    name: Name;
    currencies: Record<string, Currency>;
    capital?: string[];
    region: string;
    population: number;
    timezones: any;
    languages?: Record<string, string>;
  }
  
  export interface Flag {
    png: string;
    svg: string;
    alt?: string;
  }
  
  export interface Name {
    common: string;
    official: string;
    nativeName?: Record<string, NativeName>;
  }
  
  export interface NativeName {
    official: string;
    common: string;
  }
  
  export interface Currency {
    name: string;
    symbol: string;
  }
  
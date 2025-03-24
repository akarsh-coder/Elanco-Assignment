import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import { Country } from "../../types";

dotenv.config();

const REST_COUNTRIES_API = process.env.REST_COUNTRIES_API;
const REQUIRED_FIELDS = `?fields=name,flags,region,population,currencies,timezones,capital,languages`;

// Get all countries
export const getCountries = async (req: Request, res: Response) => {
  const response = await axios.get(
    REST_COUNTRIES_API + "all" + REQUIRED_FIELDS
  );
  const countries = response.data.map((country: Country) => ({
    name: country.name.common,
    flag: country.flags.svg,
    region: country.region,
    timezone: country.timezones[0],
  }));
  res.json(countries);
};

// Get country by code
export const getCountryByCode = async (req: Request, res: Response) => {
  const { code } = req.params;
  const response = await axios.get(`${REST_COUNTRIES_API}alpha/${code}`);
  const country = response.data[0];
  res.json({
    name: country.name.common,
    flag: country.flags.svg,
    population: country.population,
    languages: country.languages,
    region: country.region,
    currency: country.currencies,
    timezone: country.timezones[0],
  });
};

// Filter countries by region
export const filterCountriesByRegion = async (req: Request, res: Response) => {
  const { region } = req.params;
  console.log(region);
  const response = await axios.get(
    REST_COUNTRIES_API + `region/${region}` + REQUIRED_FIELDS
  );
  const countries = response.data.map((country: Country) => ({
    name: country.name.common,
    flag: country.flags.svg,
    region: country.region,
    timezone: country.timezones[0],
  }));
  res.json(countries);
};

// Search countries
export const searchCountries = async (req: Request, res: Response) => {
  try {
    const { name, capital, region, timezone } = req.query;
    const response = await axios.get(
      REST_COUNTRIES_API + "all" + REQUIRED_FIELDS
    );
    let countries = response.data;
    if (!Array.isArray(countries)) {
      throw new Error("Invalid API response");
    }
    if (name) {
      countries = countries.filter((country: Country) =>
        country.name.common
          .toLowerCase()
          .includes((name as string).toLowerCase())
      );
    }
    if (capital) {
      countries = countries.filter((country: Country) => 
        country.capital && 
        country.capital.length > 0 && 
        country.capital[0].toLowerCase().includes((capital as string).toLowerCase())
      );
    }
    if (region) {
        countries = countries.filter(
          (country: Country) => country.region && country.region.toLowerCase() === (region as string).toLowerCase()
        );
    }
    if (timezone) {
      countries = countries.filter(
        (country: Country) =>
          country.timezones.includes(timezone)
      );
    }
    const filteredCountries = countries.map((country: Country) => ({
      name: country.name.common,
      capital: country.capital ? country.capital[0] : 'N/A',
      flag: country.flags.svg,
      population: country.population,
      region: country.region,
      timezone: country.timezones[0],
      languages: country.languages ? Object.values(country.languages).join(', ') : 'N/A',
      currencies: country.currencies 
        ? Object.values(country.currencies)
            .map((currency) => `${currency.name} (${currency.symbol})`)
            .join(', ')
        : 'N/A',
    }));
    
    res.json(filteredCountries);
  } catch (error) {
    console.error("Error fetching country data:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch countries. Please try again later." });
  }
};

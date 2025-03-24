import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const countryService = {
  getAllCountries: async () => {
    try {
      const response = await apiClient.get("/countries");
      return response.data;
    } catch (error) {
      console.error("Error fetching all countries:", error);
      throw error;
    }
  },

  getCountryByCode: async (code: string) => {
    try {
      const response = await apiClient.get(`/countries/code/${code}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching country with code ${code}:`, error);
      throw error;
    }
  },

  filterCountriesByRegion: async (region: string) => {
    try {
      const response = await apiClient.get(`/countries/region/${region}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching countries in region ${region}:`, error);
      throw error;
    }
  },

  searchCountries: async (queryParams: {
    capital?: string;
    name?: string;
    region?: string;
    timezone?: string;
  }) => {
    try {
      const response = await apiClient.get("/countries/search", {
        params: queryParams,
      });
      return response.data;
    } catch (error) {
      console.error("Error searching countries:", error);
      throw error;
    }
  },
};

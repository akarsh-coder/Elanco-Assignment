import { useState, useEffect } from 'react';
import { Country } from '@/types';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import CountryCard from '../components/CountryCard';
import { countryService } from '../services/countryService';

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('');
  const [filterBy, setFilterBy] = useState('name');

  const fetchCountries = async () => {
    try {
      setLoading(true);
      let data;
      if (region) {
        data = await countryService.filterCountriesByRegion(region);
      } else {
        data = await countryService.getAllCountries();
      }
      setCountries(data);
    } catch (err) {
      setError('Failed to load countries');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCountries();
  }, [region]);


  const fetchFilteredCountries = async () => {
    try {
      setLoading(true);
      const queryParams: { capital?: string; name?: string; region?: string; timezone?: string } = {};

      if (filterBy === 'name') queryParams.name = searchTerm;
      if (filterBy === 'capital') queryParams.capital = searchTerm;
      if (filterBy === 'region') queryParams.region = searchTerm;
      if (filterBy === 'timezone') queryParams.timezone = searchTerm;

      const data = await countryService.searchCountries(queryParams);
      setCountries(data);

    } catch (err) {
      setError('Failed to load countries');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100">
    <Header />
    <div className="p-6">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} filterBy={filterBy} setFilterBy={setFilterBy} onSearch={fetchFilteredCountries}/>
      <div className="mb-4">
          <label className="block text-gray-700 mb-2">Filter by Region</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="">All Regions</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
            <option value="Antarctic">Antarctic</option>
          </select>
        </div>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {countries.length > 0 ? (
          countries.map((country:Country) => <CountryCard key={country.name} country={country} />)
        ) : (
          <p className="text-gray-500 text-center col-span-full">No countries found.</p>
        )}
      </div>
    </div>
  </div>
  );
};

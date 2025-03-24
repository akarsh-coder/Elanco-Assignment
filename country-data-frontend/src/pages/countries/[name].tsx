import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { countryService } from "../../services/countryService";
import { Country } from '@/types';
import Image from 'next/image';

const CountryPage = () => {
  const router = useRouter();
  const { name } = router.query;
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (name) {
      fetchCountryDetails(name as string);
    }
  }, [name]);

  const fetchCountryDetails = async (countryName: string) => {
    try {
      setLoading(true);
      const data = await countryService.searchCountries({ name: countryName });
      console.log(data);
      if (data.length > 0) {
        setCountry(data[0]);
      } else {
        setError('Country not found');
      }
    } catch (err) {
      setError('Failed to load country details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold">{country?.name}</h1>
      <div className="mt-4">
      {country &&  <Image 
          src={country.flag} 
          alt={`Flag of ${country?.name}`} 
          className="w-40 h-24 rounded-md shadow-md"
          width={40}
          height={24}
        />}
      </div>
      
      <div className="mt-6 bg-white shadow-md p-6 rounded-lg w-full max-w-md">
        <p className="text-lg"><strong>Official Name:</strong> {country?.name}</p>
        <p className="text-lg"><strong>Region:</strong> {country?.region}</p>
        <p className="text-lg"><strong>Population:</strong> {country?.population.toLocaleString()}</p>
        <p className="text-lg"><strong>Timezone:</strong> {country?.timezone}</p>

        <div className="mt-3">
          <p className="text-lg"><strong>Capital:</strong> {country?.capital || 'N/A'}</p>
        </div>

        <div className="mt-3">
  <p className="text-lg font-semibold">Languages:</p>
  {country?.languages && country.languages.length > 0 ? (
    <p className=" text-gray-700">
      {country.languages}
    </p>
  ) : (
    <p className="text-gray-500">N/A</p>
  )}
</div>

<div className="mt-3">
  <p className="text-lg font-semibold">Currencies:</p>
  {country?.currencies && country.currencies.length > 0 ? (
    <p className="text-gray-700">
      {country.currencies}
    </p>
  ) : (
    <p className="text-gray-500">N/A</p>
  )}
</div>

      </div>
    </div>
  );
};

export default CountryPage;

import Image from 'next/image'
import { Country } from '@/types'
import React, { useEffect, useState } from 'react'
import { DateTime, Zone } from 'luxon'
import { useRouter } from 'next/navigation';

function CountryCard({ country }: { country: Country }) {
  const timezone = country.timezone || "UTC";
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {

    const ianaTimezone = timezone.startsWith('UTC') 
      ? DateTime.local().setZone(timezone).zoneName 
      : timezone;

    const updateTime = () => {
      const time = DateTime.now()
        .setZone(ianaTimezone as string | Zone<boolean> | undefined)
        .toLocaleString({
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
      setCurrentTime(time);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezone]);
 
  const handleClick = () => {
    router.push(`/countries/${encodeURIComponent(country.name)}`);
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"  onClick={handleClick}>
      <div className="w-24 h-16 relative">
        <Image
          src={country.flag}
          alt={`Flag of ${country.name}`}
          fill={true}
          priority={true}
          className="rounded-md"
        />
      </div>
      
      <div className="mt-3 text-center">
        <h2 className="text-lg font-semibold">{country.name}</h2>
        <p className="text-sm text-gray-600">{country.region}</p>
        <p className="text-sm text-green-500 font-semibold">{currentTime}</p>
      </div>
    </div>
  )
}

export default CountryCard
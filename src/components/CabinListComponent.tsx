import { useState, useEffect } from 'react';
import useApi from '../hooks/useApi';  // Make sure the import path is correct
import { useAuth0 } from '@auth0/auth0-react';

interface Booking {
  // Add booking details if necessary
  bookingId?: number;
  startDate?: string;
  endDate?: string;
}

interface Cabin {
  cabinId: number;
  name: string;
  location: string;
  description: string;
  visible: boolean;
  numberOfBeds: number;
  bookings: Booking[] | null;
}


const CabinListComponent = () => {
  const { isAuthenticated } = useAuth0();
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const { callApiWithToken } = useApi();  // This now matches the exported name

  const fetchCabins = async () => {
    const data = await callApiWithToken('/api/cabins');
    setCabins(data as Cabin[]); // Typecast data as Cabin[]
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCabins();
    }
  }, [isAuthenticated]); // Dependency on isAuthenticated

  if (!isAuthenticated) {
    return <div>Please log in to view cabins.</div>;
  }

  return (
    <div>
      <h1>Cabins List</h1>
      <ul>
        {cabins.map(cabin => (
          <li key={cabin.cabinId}>
            {cabin.name} - {cabin.location}
            <p>{cabin.description}</p>
            <p>Beds: {cabin.numberOfBeds}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CabinListComponent;

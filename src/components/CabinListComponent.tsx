import { useState, useEffect, useCallback } from 'react';
import useApi from '../hooks/useApi'; // Ensure the import path is correct
import { useAuth0 } from '@auth0/auth0-react';

interface Booking {
  bookingId: number;
  startDate: string;
  endDate: string;
  status: string;
  title: string;
}

interface Cabin {
  cabinId: number;
  name: string;
  location: string;
  description: string;
  visible: boolean;
  numberOfBeds: number;
  bookings: Booking[];
  userCabinRelations: { id: number; }[];
}

const CabinListComponent = () => {
  const { isAuthenticated } = useAuth0();
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { callApiWithToken } = useApi();

  const fetchCabins = useCallback(async () => {
    setLoading(true);
    try {
      const data = await callApiWithToken('/api/cabins');
      setCabins((data as Cabin[]).filter(cabin => cabin.visible && cabin.userCabinRelations.length > 0)); // Only show cabins that are set to be visible and have userCabinRelations
    } catch (error) {
      setError('Failed to fetch cabins');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array for useCallback

  useEffect(() => {
    if (isAuthenticated) {
      fetchCabins();
    }
  }, [isAuthenticated]); // Only include isAuthenticated as a dependency

  if (!isAuthenticated) {
    return <div>Please log in to view cabins.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Cabins List</h1>
      <ul>
        {cabins.map(cabin => (
          <li key={cabin.cabinId}>
            <h2>{cabin.name} - {cabin.location}</h2>
            <p>{cabin.description}</p>
            <p>Beds: {cabin.numberOfBeds}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CabinListComponent;

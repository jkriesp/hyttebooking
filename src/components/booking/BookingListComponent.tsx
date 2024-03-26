import { useState, useEffect, useCallback } from 'react';
import useApi from '../../hooks/useApi'; // Ensure the import path is correct
import { useAuth0 } from '@auth0/auth0-react';

interface Booking {
  bookingId: number;
  startDate: string;
  endDate: string;
  status: string;
  title: string;
}

const BookingListComponent = () => {
  const { isAuthenticated } = useAuth0();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { callApiWithToken } = useApi();

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await callApiWithToken('/api/bookings');
      setBookings(data as Booking[]);
    } catch (error) {
      setError('Failed to fetch bookings');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array for useCallback

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated]); // Only include isAuthenticated as a dependency

  if (!isAuthenticated) {
    return <div>Please log in to view bookings.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Bookings List</h1>
      <ul>
        {bookings.map(booking => (
          <li key={booking.bookingId}>
            <h2>{booking.title}</h2>
            <p>Start Date: {booking.startDate}</p>
            <p>End Date: {booking.endDate}</p>
            <p>Status: {booking.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingListComponent;

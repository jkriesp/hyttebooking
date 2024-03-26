import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';

interface Booking {
  startDate: string;
  endDate: string;
  status: string;
  title: string;
  cabinId: number;
  userId: number;
}

const BookingForm = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [booking, setBooking] = useState<Booking>({
    startDate: '',
    endDate: '',
    status: '',
    title: '',
    cabinId: 0,
    userId: 0
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBooking({ ...booking, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const bookingData = {
      startDate: booking.startDate,
      endDate: booking.endDate,
      status: booking.status,
      title: booking.title,
      cabin: { cabinId: parseInt(booking.cabinId) },
      user: { userId: parseInt(booking.userId) }
    };

    // Here you might want to further validate or reformat the dates if necessary
    const accessToken = await getAccessTokenSilently();
    try {
      const response = await fetch('http://localhost:8080/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        console.log(response);
        throw new Error('Error creating booking');
      }

      const result = await response.json();
      console.log('Booking created:', result);
    } catch (error) {
      console.error('Failed to create booking:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={booking.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={booking.startDate}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={booking.endDate}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="status">Status:</label>
        <input
          type="text"
          id="status"
          name="status"
          value={booking.status}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="cabinId">Cabin ID:</label>
        <input
          type="number"
          id="cabinId"
          name="cabinId"
          value={booking.cabinId}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="userId">User ID:</label>
        <input
          type="number"
          id="userId"
          name="userId"
          value={booking.userId}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Create Booking</button>
    </form>
  );
};

export default BookingForm;

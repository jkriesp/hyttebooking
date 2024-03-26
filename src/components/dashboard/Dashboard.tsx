import { useState } from 'react';
import CreateCabin from '../cabin/CreateCabin';
import CreateBooking from '../booking/CreateBooking';
import ViewBooking from '../booking/ViewBooking';
import ViewCabins from '../cabin/ViewCabin';
import { useAuth0 } from '@auth0/auth0-react';

function Dashboard() {
  const [view, setView] = useState('createCabin'); // default view

  const { isAuthenticated } = useAuth0();

  return isAuthenticated && (
    <div>
      <nav>
        <button onClick={() => setView('createCabin')}>Create Cabin</button>
        <button onClick={() => setView('viewCabins')}>View Cabins</button>
        <button onClick={() => setView('createBooking')}>Create Booking</button>
        <button onClick={() => setView('viewBooking')}>View Bookings</button>

      </nav>

      {view === 'createCabin' && <CreateCabin />}
      {view === 'createBooking' && <CreateBooking />}
      {view === 'viewBooking' && <ViewBooking />}
      {view === 'viewCabins' && <ViewCabins />}
    </div>
  );
}

export default Dashboard;
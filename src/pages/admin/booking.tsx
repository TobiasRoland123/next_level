import { LayoutAdmin } from '@/Layout_Admin';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { supabase } from '../../../utils/supabaseClient';
import { json } from 'stream/consumers';
import { UserBookingsProps } from '@/Types/adminBooking';
import { DataTable } from '@/components/BookingTable/data-table';
import { columns } from '@/components/BookingTable/columns';

export async function getServerSideProps() {
  let { data: UserBookings, error } = await supabase.from('UserBookings').select('*');
  console.log(error);

  return { props: { UserBookings } };
}

export default function Booking({ UserBookings }: { UserBookings: UserBookingsProps[] }) {
  const bookingsToday = () => {
    const today = new Date();
    const bookings: UserBookingsProps[] = [];
    for (let i = 0; i < UserBookings.length; i++) {
      const userDate = new Date(UserBookings[i].dato);
      if (userDate === today) {
        bookings.push(UserBookings[i]);
      }
    }
    //sort bookings according to start Time
    return bookings;
  };
  const futureBookings = () => {
    //filter out dates from today and before today ++ sort according to starttimes.
  };

  const pastBookings = () => {
    //filter out dates from today and after today ++ sort according to starttimes.
  };

  // COMMENT OUT FROM HERE TO DISABLE LOGIN GUARD
  const router = useRouter();
  getSession();
  async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (data.session === null) {
      router.push('/login');
    }
  }

  function showData() {
    console.log(UserBookings);
    const dato = new Date(UserBookings[0].dato);
    console.log('dato', dato);
  }

  showData();

  // En checkbox om du vil se forrige bookinger også, lav et tredje table under der viser disse.
  return (
    <>
      <LayoutAdmin>
        <main className='spacer pb-10 '>
          <h1 className='mt-20'>Administrer bookinger</h1>
          <section>
            <article>
              <h3>Bookinger i dag</h3>
              <div className='bg-contrastCol mt-8 p-4 lg:block bookingTable'>
                <DataTable columns={columns} data={UserBookings} />
              </div>
            </article>
            <article>
              <h3>Fremtidige bookinger</h3>
              <div className='bg-contrastCol mt-8 p-4 hidden lg:block'>content</div>
            </article>
          </section>
        </main>
      </LayoutAdmin>
    </>
  );
}

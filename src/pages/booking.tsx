import { Layout } from '@/Layout';
import { Hero } from '@/modules/Hero/Hero';
import { supabase } from '../../utils/supabaseClient';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BookingFlow } from './BookingFlow';
const queryClient = new QueryClient();

export const fetchBooking = async () => {
  let { data, error } = await supabase.from('bookingFlow').select('*');
  return data;
};

export default function Booking() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <main>
          <Hero
            header="Book DK's mest unikke gaming oplevelse"
            redWord={['unikke']}
            isFrontPage={false}
            content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non urna aliquet, mollis lacus sed, dignissim lectus. Curabitur eget diam volutpat, facilisis massa nec, varius nulla.'
          />
          <BookingFlow />
        </main>
      </Layout>
    </QueryClientProvider>
  );
}

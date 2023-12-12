import { useQuery } from '@tanstack/react-query';
import { fetchBooking } from './booking';

export const BookingFlow = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['hydrate-bookingData'],
    queryFn: () => fetchBooking(),
  });

  console.log('isLoading:', isLoading);
  console.log('isError:', isError);
  console.log('data:', data);
  return (
    <>
      <button> klik klik</button>
    </>
  );
};

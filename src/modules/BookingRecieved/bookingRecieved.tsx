import { UserBooking } from '@/Types/calendar';
import { formattedDate } from '@/calendarFunctions/calendarFunctions';
import { motion } from 'framer-motion';

interface BookingProps {
  userChoices: UserBooking;
}

export const BookingRecieved: React.FC<BookingProps> = ({ userChoices }) => {
  // @ts-ignore
  const dato: string = userChoices.date.toString();
  const startTid: string | undefined = userChoices.startTime?.time;
  return (
    <motion.article
      id='bookingComplete'
      className='spacer'
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        duration: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div className='bg-contrastCol mt-8 p-4 max-w-fit lg:block'>
        <h2>Tak for din booking!</h2>
        <p className='font-semibold'>
          Vi ses <span>{formattedDate(dato)}</span>, kl. {startTid}!
        </p>
      </div>
    </motion.article>
  );
};

export default BookingRecieved;

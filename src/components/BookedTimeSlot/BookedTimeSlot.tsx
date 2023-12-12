import { BookingTimeSlot, UserBooking } from '@/Types/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface BookedTimeSlotProps {
  time: BookingTimeSlot;
  index: number;
  allTimes: BookingTimeSlot[];
  userChoices: UserBooking | undefined;
}
export const BookedTimeSlot = ({ time, index, allTimes, userChoices }: BookedTimeSlotProps) => {
  const nextAvailibleTime = () => {
    let availibleTimes = [];
    for (let i = 0; i < allTimes.length; i++) {
      if (allTimes[i].booked === false) {
        availibleTimes.push(allTimes[i].time);
      }
    }
    if (userChoices?.startTime === undefined || userChoices?.endTime?.index === undefined) {
      return (
        <>
          <p>Vælg en start tid for din booking af de mulige ledige tider:</p>
          <ul className='flex flex-row flex-wrap'>
            {availibleTimes.map((time) => (
              <li key={time}>{time}, </li>
            ))}
          </ul>
        </>
      );
    } else if (userChoices?.startTime?.index !== undefined && userChoices.startTime.index < index) {
      let slicing = userChoices.startTime.index;
      let shortendArray = allTimes.slice(slicing);
      let indexOfLastPossible = shortendArray.findIndex((tid) => tid.booked === true) - 1;
      return <p>{/* Hvis du starter kl. {userChoices.startTime.time} er det seneste du kan booke til kl. {shortendArray[indexOfLastPossible].time}. */}</p>;
    } else if (userChoices?.startTime?.index !== undefined && userChoices.startTime.index > index) {
      let slicing = userChoices.startTime.index;
      let shortendArray = allTimes.slice(0, -slicing);
      let indexOfFirstPossible = shortendArray.findIndex((tid) => tid.booked === false) + 1;
      // console.log("Test", slicing, shortendArray, indexOfFirstPossible);
      return (
        <p>
          Hvis du starter kl. {userChoices.startTime.time} er det seneste du kan booke til kl. {shortendArray[indexOfFirstPossible].time}.
        </p>
      );
    }
  };

  return (
    <>
      <input type='checkbox' name='tid' id={time.time} key={index} className='absolute z-0 opacity-0' disabled />
      <Popover>
        <PopoverTrigger className='min-w-[85px] cursor-not-allowed'>
          <label htmlFor={time.time} className='w-full block text-center py-2 border bg-slate-500 border-slate-500 text-slate-700 pointer-events-none cursor-not-allowed'>
            {time.time}
          </label>
        </PopoverTrigger>
        <PopoverContent side='top' sideOffset={15}>
          <p className='mt-0'>Vi er desværre fuldt booket kl. {time.time}.</p>
          {nextAvailibleTime()}
        </PopoverContent>
      </Popover>
    </>
  );
};

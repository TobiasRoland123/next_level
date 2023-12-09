import { BookingTimeSlot } from "@/Types/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface BookedTimeSlotProps {
  time: BookingTimeSlot;
  index: number;
  allTimes: BookingTimeSlot[];
}
export const BookedTimeSlot = ({ time, index }: BookedTimeSlotProps) => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <input type="checkbox" name="tid" id={time.time} key={index} className="absolute z-0 opacity-0 peer" disabled />
          <label htmlFor={time.time} className="peer-disabled:bg-slate-500 peer-disabled:border-slate-500 peer-disabled:text-slate-700 peer-disabled:pointer-events-none peer-disabled:cursor-not-allowed">
            {time.time}
          </label>
        </PopoverTrigger>
        <PopoverContent>Place content for the popover here.</PopoverContent>
      </Popover>
    </>
  );
};

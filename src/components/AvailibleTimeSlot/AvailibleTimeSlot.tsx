import { BookingTimeSlot } from '@/Types/calendar';

interface AvailibleTimeSlotsProps {
  time: BookingTimeSlot;
  index: number;
  defaultChecked?: any;
  onClick?: any;
  className?: any;
}
export const AvailibleTimeSlot = ({ time, index, ...props }: AvailibleTimeSlotsProps) => {
  return (
    <>
      <input
        type='checkbox'
        name='tid'
        id={time.time}
        key={index}
        className={`absolute z-0 invisible peer/${index}`}
        defaultChecked={props.defaultChecked}
      />
      <label
        htmlFor={time.time}
        onClick={props.onClick}
        className={props.className}
      >
        {time.time}
      </label>
    </>
  );
};

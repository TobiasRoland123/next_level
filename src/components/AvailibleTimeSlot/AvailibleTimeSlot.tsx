import { BookingTimeSlot, UserBooking } from "@/Types/calendar";
import { useState } from "react";

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
      <input type="checkbox" name="tid" id={time.time} key={index} className="absolute z-0 opacity-0 peer" defaultChecked={props.defaultChecked} />
      <label htmlFor={time.time} onClick={props.onClick} className={props.className}>
        {time.time}
      </label>
    </>
  );
};

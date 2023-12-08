export interface TimeSlot {
  time: string;
  index?: number | undefined;
}

export interface BookingArray {
  [index: number]: DateSchedule;
}

export interface DateSchedule {
  [date: string]: {
    [computer: string]: BookingTimeSlot[];
  };
}

export interface BookingTimeSlot {
  time: string;
  booked: boolean;
}

export type BTS = (number | undefined)[];

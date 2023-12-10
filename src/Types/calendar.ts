export interface TimeSlot {
  time: string;
  index?: number | undefined;
}

export interface TimeSlotOptions {
  time: string;
  booked: boolean;
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
  booked?: boolean;
  bookedCount?: number | undefined;
}

export interface PCObjects {
  [pc: string]: BookingTimeSlot[] | undefined;
}

export interface UserBooking {
  amount?: number;
  date?: string;
  startTime?: TimeSlot;
  endTime?: TimeSlot;
}

export type BTS = (number | undefined)[];

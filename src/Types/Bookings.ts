import { BookingTimeSlot, TimeSlot } from "./calendar";

export interface Bookings {
  id: number;
  date: Date;
  PC1: Array<BookingTimeSlot>;
  PC2: Array<BookingTimeSlot>;
  PC3: Array<BookingTimeSlot>;
  PC4: Array<BookingTimeSlot>;
  PC5: Array<BookingTimeSlot>;
  NLP: Array<BookingTimeSlot>;
}
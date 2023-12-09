export interface Bookings {
  id: number;
  date: Date;
  PC1: Array<{ time: string; booked: boolean }>;
  PC2: Array<{ time: string; booked: boolean }>;
  PC3: Array<{ time: string; booked: boolean }>;
  PC4: Array<{ time: string; booked: boolean }>;
  PC5: Array<{ time: string; booked: boolean }>;
  NLP: Array<{ time: string; booked: boolean }>;
}

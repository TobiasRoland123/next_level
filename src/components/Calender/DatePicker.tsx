"use client";

import * as React from "react";

import { Calendar } from "../../components/ui/calendar";

export function DatePicker() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={(newDate) => {
        setDate(newDate);
        console.log(date);
      }}
      className="calendarDatePickerMate rounded-md shadow bg-contrastCol w-full"
    />
  );
}

'use client';

import * as React from 'react';

import { Calendar } from '../../components/ui/calendar';
import { Matcher } from 'react-day-picker';

export function DatePicker(props: Matcher | Matcher[] | undefined) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode='single'
      selected={date}
      //@ts-ignore
      disabled={props.disabledDays}
      onSelect={(newDate) => {
        setDate(newDate);
        //@ts-ignore
        props.onSelect(newDate);
        //console.log(date);
      }}
      className='calendarDatePickerMate rounded-md shadow bg-contrastCol w-full'
    />
  );
}

"use client";

import * as React from "react";
// import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface InputDatePickerProps {
  onDateChange: (value: string) => void;
}

export function InputDatePicker({ onDateChange }: InputDatePickerProps) {
  const [date, setDate] = React.useState<Date>();

  const handleDateSelect = (selectedDate: Date) => {
    const formattedDate = format(selectedDate, "dd-MM-yyyy"); // adjust the format as needed
    setDate(selectedDate);
    onDateChange(formattedDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "w-[240px] justify-start bg-contrastCol text-left font-normal hover:bg-contrastCol",
            !date && "text-muted-foreground"
          )}
        >
          {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
          {date ? format(date, "P") : <span>Vælg en dato</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 border-none bg-contrastCol"
        align="start"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

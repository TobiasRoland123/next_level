"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "../../lib/utils";
import { buttonVariants } from "../../components/ui/button";

const disabledDays2 = (numberOfDays: number): Date[] => {
  const disabledDays: Date[] = [];
  const daysInWeek = 7;

  for (let i = 0; i < numberOfDays; i++) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + i);

    const dayOfWeek = currentDate.getDay();
    // 5 corresponds to Friday and 6 corresponds to Saturday
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
      const day = String(currentDate.getDate()).padStart(2, "0");

      // Format the date as "YYYY, MM, DD"
      const formattedDate = `${Number(year)}, ${Number(month)}, ${Number(day)}`;

      disabledDays.push(new Date(formattedDate));
    }
  }
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 14);
  const fYear = futureDate.getFullYear();
  const fMonth = String(futureDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const fDay = String(futureDate.getDate()).padStart(2, "0");

  // Format the date as "YYYY, MM, DD"
  const fFormattedDate = `${Number(fYear)}, ${Number(fMonth)}, ${Number(fDay)}`;
  //@ts-ignore
  disabledDays.push({ from: new Date(fFormattedDate), to: new Date(2050, 1, 1) });

  //past day
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 1);
  const pYear = pastDate.getFullYear();
  const pMonth = String(pastDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const pDay = String(pastDate.getDate()).padStart(2, "0");

  const pFormattedDate = `${Number(pYear)}, ${Number(pMonth)}, ${Number(pDay)}`;
  //@ts-ignore
  disabledDays.push({ from: new Date(2023, 1, 1), to: new Date(pFormattedDate) });

  console.log(disabledDays);

  return disabledDays;
};

const disabledDays = disabledDays2(14);

export type CalendarProps = React.ComponentProps<typeof DayPicker>;
function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      disabled={disabledDays}
      defaultMonth={new Date()}
      showOutsideDays={showOutsideDays}
      weekStartsOn={1}
      showWeekNumber
      formatters={{ formatWeekNumber: (weekNumber) => `Uge ${weekNumber}` }}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col md:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
        day_range_end: "day-range-end",
        // hover:text-contrastCol -- Removed from day_selected
        day_selected: "bg-primaryCol text-primary-foreground hover:bg-contrastCol focus:bg-accentCol focus:text-secondaryCol",
        day_today:
          // "bg-accent text-accent-foreground"
          "border border-accentCol",
        day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground text-accentCol opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };

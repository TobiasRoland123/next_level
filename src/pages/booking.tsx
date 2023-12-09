import { Layout } from "@/Layout";
import { Hero } from "@/modules/Hero/Hero";
import { Input } from "@/components/Inputfields/Inputfield";
import { FaUserGroup } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { DatePicker } from "@/components/Calender/DatePicker";
import { ChangeEvent, MouseEvent, useState } from "react";
import { BookingTypes } from "@/enum/BookingTimes";
import { Matcher } from "react-day-picker";
import { BTS, BookingArray, BookingTimeSlot, PCObjects, TimeSlot, TimeSlotOptions } from "@/Types/calendar";
import { bookings } from "@/Types/bookingTestArray";
import { supabase } from "../../utils/supabaseClient";
import { Bookings } from "@/Types/Bookings";
import { futureDays, pastDays } from "@/calendarFunctions/calendarFunctions";
import timeSlots from "@/Types/TimesArray";

export async function getServerSideProps() {
  let { data: john, error } = await supabase.from("Bookings").select("*");

  return { props: { john } };
}

export default function Booking({ john }: { john: Bookings[] }) {
  interface UserBooking {
    amount?: number;
    date?: string;
    startTime?: TimeSlot;
    endTime?: TimeSlot;
  }

  const [userChoices, setUserChoices] = useState<UserBooking | undefined>();
  const [startTid, setStartTid] = useState<TimeSlot>({ time: "", index: undefined });
  const [slutTid, setSlutTid] = useState<TimeSlot>({ time: "", index: undefined });
  const [bTS, setBTS] = useState<BTS>([]);
  const [bookingDateTimes, setBookingDateTimes] = useState<BookingTimeSlot[]>(timeSlots);

  //Make same function and use Enums with a switch Statement
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserChoices((prevData) => ({
      ...prevData,
      amount: Number(e.target.value),
    }));
  };

  const handleDateChange = (e: string) => {
    const date = new Date(e);
    const Year = date.getFullYear();
    const Month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const Day = String(date.getDate()).padStart(2, "0");

    const FormattedDate = `${Number(Year)}-${Number(Month)}-${Number(Day)}`;
    console.log("FormattedDate", FormattedDate);

    setUserChoices((prevData) => ({
      ...prevData,
      date: FormattedDate,
    }));
    bookingTimes(FormattedDate);
  };

  function bookingTimes(chosenDate: string) {
    //@ts-ignore
    const matchingDate = Boolean(john.find((booking) => booking.date === chosenDate));
    console.log(matchingDate, chosenDate);

    if (!matchingDate) {
      setBookingDateTimes(timeSlots);
      return;
    }
    //@ts-ignore
    const dateBooking = john.find((booking) => booking.date === chosenDate);
    const PCS: PCObjects = { PC1: dateBooking?.PC1, PC2: dateBooking?.PC2, PC3: dateBooking?.PC3, PC4: dateBooking?.PC4, PC5: dateBooking?.PC5 };
    console.log(PCS);

    const availibleTimes: BookingTimeSlot[] = [];

    for (const pc in PCS) {
      // Iterate over each entry for the current PC
      // @ts-ignore
      for (const entry of PCS[pc]) {
        // Find the corresponding entry in the resultArray or create a new one
        const resultEntry: BookingTimeSlot | undefined = availibleTimes.find((item) => item.time === entry.time);

        if (resultEntry) {
          // If the entry exists, update the count based on the booked status
          if (entry.booked) {
            resultEntry.bookedCount = (resultEntry.bookedCount || 0) + 1;
          }
        } else {
          // If the entry doesn't exist, create a new one
          const newEntry = {
            time: entry.time,
            bookedCount: entry.booked ? 1 : 0,
          };
          availibleTimes.push(newEntry);
        }
      }
    }

    for (let i = 0; i < availibleTimes.length; i++) {
      console.log(i);
      if (i < 12) {
        // @ts-ignore
        if (availibleTimes[i].bookedCount > 4 && (availibleTimes[i + 1].bookedCount > 4 || availibleTimes[i - 1].bookedCount > 4)) {
          availibleTimes[i].booked = true;
        } else {
          availibleTimes[i].booked = false;
        }
      } else if (i === 12) {
        // @ts-ignore
        if (availibleTimes[i].bookedCount > 4) {
          availibleTimes[i].booked = true;
        } else {
          availibleTimes[i].booked = false;
        }
      }
    }

    setBookingDateTimes(availibleTimes);
  }

  function addTime(tid: string, index: number) {
    // console.log"We are in");

    if (!startTid.time && !slutTid.time) {
      // console.log"!startTid.time");
      setStartTid({ time: tid, index: index });
      timesArray(index, BookingTypes.StartTime);
    } else if (!slutTid.time) {
      // console.log"!slutTid.time");
      if (startTid.index !== undefined && startTid.index < index) {
        // console.log"startTid.index < index");
        setSlutTid({ time: tid, index: index });
        timesArray(index, BookingTypes.EndTime);
        // @ts-ignore
      } else if (startTid.index > index) {
        // console.log"startTid.index > index");
        setStartTid({ time: tid, index: index });
        setSlutTid({ time: startTid.time, index: startTid.index });
        timesArray(index, BookingTypes.NewStartOldEnd);
      } else if (startTid.index === index) {
        setStartTid({ time: "", index: undefined });
        timesArray(index, BookingTypes.Clear);
      }
    } else if (!startTid.time) {
      // @ts-ignore
      if (slutTid.index > index) {
        // console.log"slutTid.index > index");
        setStartTid({ time: tid, index: index });
        timesArray(index, BookingTypes.SameEndNewStart);

        // @ts-ignore
      } else if (slutTid.index < index) {
        // console.log"slutTid.index < index");
        setSlutTid({ time: tid, index: index });
        setStartTid({ time: slutTid.time, index: slutTid.index });
        timesArray(index, BookingTypes.OldStartNewEnd);
      } else if (slutTid.index === index) {
        setSlutTid({ time: "", index: undefined });
        timesArray(index, BookingTypes.Clear);
      }
    } else {
      // console.log"startTid.index && slutTid.index has value");
      if (startTid.index === index) {
        // console.log"startTid.index === index");
        setStartTid({ time: "", index: undefined });
        timesArray(index, BookingTypes.KeepEndRemoveStart);
      } else if (slutTid.index === index) {
        // console.log"slutTid.index === index");
        setSlutTid({ time: "", index: undefined });
        timesArray(index, BookingTypes.KeepStartRemoveEnd);
      } else {
        // @ts-ignore
        const diffStart = Math.abs(startTid.index - index); // Calculate absolute difference between constant1 and targetValue

        // @ts-ignore
        const diffSlut = Math.abs(slutTid.index - index); // Calculate absolute difference between constant2 and targetValue

        if (diffStart < diffSlut) {
          // console.log"Index closes to startTime");
          setStartTid({ time: tid, index: index });
          timesArray(index, BookingTypes.StartLowerEnd);
        } else if (diffStart > diffSlut) {
          // console.log"Index closes to endTime");
          setSlutTid({ time: tid, index: index });
          timesArray(index, BookingTypes.StartHigherEnd);
        } else {
          // console.log"Same same, tag og ændre startTiden");
          setStartTid({ time: tid, index: index });
          timesArray(index, BookingTypes.StartLowerEnd);
        }
      }
      //@ts-ignore
      // console.log"vi er ved Total Time");
    }
    // console.log`StartTid: ${startTid.time}, ${startTid.index}`);
    // console.log`SlutTid: ${slutTid.time}, ${slutTid.index}`);
  }
  function timesArray(index: number, value: string) {
    // console.log"bTS", bTS);
    let diffVal: number;
    let newArr: number | undefined[] = [];
    switch (value) {
      case BookingTypes.StartTime:
        setBTS([index]);
        break;
      case BookingTypes.EndTime:
        //@ts-ignore
        diffVal = index - bTS[0];
        // console.log"diffVal1", diffVal);

        for (let i = 0; i <= diffVal; i++) {
          //@ts-ignore
          newArr.push(startTid.index + i);
        }
        setBTS(newArr);
        break;
      case BookingTypes.NewStartOldEnd:
        //@ts-ignore
        diffVal = startTid.index - index;
        // console.log"diffVal2", diffVal);

        for (let i = 0; i <= diffVal; i++) {
          //@ts-ignore
          newArr.push(index + i);
        }
        setBTS(newArr);
        break;
      case BookingTypes.Clear:
        setBTS([]);
        break;
      case BookingTypes.SameEndNewStart:
        //@ts-ignore
        diffVal = (index - slutTid.index) * -1;
        // console.log"diffVal4", diffVal);

        for (let i = 0; i <= diffVal; i++) {
          //@ts-ignore
          newArr.push(index + i);
        }
        setBTS(newArr);
        break;
      case BookingTypes.OldStartNewEnd:
        //@ts-ignore
        diffVal = startTid.index - index;
        // console.log"diffVal2", diffVal);

        for (let i = 0; i <= diffVal; i++) {
          //@ts-ignore
          newArr.push(index + i);
        }
        setBTS(newArr);
        break;
      case BookingTypes.KeepEndRemoveStart:
        setBTS([slutTid.index]);
        break;
      case BookingTypes.KeepStartRemoveEnd:
        setBTS([startTid.index]);
        break;
      case BookingTypes.StartLowerEnd:
        //@ts-ignore
        diffVal = index - slutTid.index;
        // console.log"diffVal2", diffVal);

        for (let i = 0; i <= diffVal; i++) {
          //@ts-ignore
          newArr.push(index + i);
        }
        setBTS(newArr);
        break;
      case BookingTypes.StartHigherEnd:
        //@ts-ignore
        diffVal = startTid.index - index;
        // console.log"diffVal2", diffVal);

        for (let i = 0; i <= diffVal; i++) {
          //@ts-ignore
          newArr.push(index + i);
        }
        break;
    }
  }
  const disabledDays123 = (numberOfDays: number): Matcher | Matcher[] | undefined => {
    const disabledDays: Date[] = [];
    const daysInWeek = 7;
    // console.log"numberOfDays", numberOfDays);

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

    disabledDays.push(pastDays());
    disabledDays.push(futureDays(numberOfDays));
    // @ts-ignore
    disabledDays.push(BookedDays(numberOfDays, john));

    function BookedDays(days: number, bookings: Bookings[]) {
      if (bookings.length > 0) {
        for (let i = 0; i < bookings.length; i++) {
          const date = bookings[i].date;
          const inputDate = new Date(date);

          // Get the current date
          const currentDate = new Date();

          // Calculate the date 14 days in the future
          const futureDate = new Date();
          futureDate.setDate(currentDate.getDate() + days);

          // Check if the inputDate is between currentDate and futureDate
          if (inputDate >= currentDate && inputDate <= futureDate) {
            // console.log"The date is between today and the latest possible day in the future.");
            const PCS: PCObjects = { PC1: bookings[i].PC1, PC2: bookings[i].PC2, PC3: bookings[i].PC1, PC4: bookings[i].PC1, PC5: bookings[i].PC1 };
            // console.logPCS);

            // Create a new array to store the results
            const resultArray: BookingTimeSlot[] = [];

            // Iterate over each key in the inputObject
            for (const pc in PCS) {
              // Iterate over each entry for the current PC
              // @ts-ignore
              for (const entry of PCS[pc]) {
                // Find the corresponding entry in the resultArray or create a new one
                const resultEntry: BookingTimeSlot | undefined = resultArray.find((item) => item.time === entry.time);

                if (resultEntry) {
                  // If the entry exists, update the count based on the booked status
                  if (entry.booked) {
                    resultEntry.bookedCount = (resultEntry.bookedCount || 0) + 1;
                  }
                } else {
                  // If the entry doesn't exist, create a new one
                  const newEntry = {
                    time: entry.time,
                    bookedCount: entry.booked ? 1 : 0,
                  };
                  resultArray.push(newEntry);
                }
              }
            }

            // console.log"resultArray", resultArray);
            const PCLedigeTider = resultArray.some((slot, index) => {
              if (index < resultArray.length - 1) {
                const nextSlot = resultArray[index + 1];
                return slot.bookedCount !== 5 && nextSlot.bookedCount !== 5;
              }
              return false;
            });
            if (PCLedigeTider === true) {
              // console.logPCLedigeTider);
            } else {
              // console.logPCLedigeTider);
              // console.lognew Date(bookings[i].date));

              disabledDays.push(new Date(bookings[i].date));
            }
          }
        }
      }
    }
    // console.log"disabledDays", disabledDays);

    return disabledDays;
  };

  const disabledDays: Matcher | Matcher[] | undefined = disabledDays123(21);

  return (
    <>
      <Layout>
        <main>
          <Hero header="Book DK's mest unikke gaming oplevelse" redWord={["unikke"]} isFrontPage={false} content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non urna aliquet, mollis lacus sed, dignissim lectus. Curabitur eget diam volutpat, facilisis massa nec, varius nulla." />
          <section>
            <article id="antalGuests" className="w-full">
              <div className="bg-contrastCol mt-8 p-4 lg:block">
                <h4 className="mt-0">Hvor mange kommer i?</h4>
                <p> For at vi kan checke om der er PC'er nok til jer, så vil vi gerne vide hvor mang i kommer. </p>
              </div>
              <div className="bg-contrastCol md:mt-8 p-4 lg:block">
                <p className="mt-0 flex flex-row align-middle gap-x-2">
                  <FaUserGroup className="inline-block mt-0.4" />
                  <span>Antal (max 5)</span>
                </p>
                <Input type="number" max={5} min={1} className="border-white" onChange={handleAmountChange}></Input>
              </div>
            </article>
            <article id="date" className="w-full">
              <div className="bg-contrastCol mt-8 p-4 lg:block">
                <h4 className="mt-0">Hvilken dag vil i komme?</h4>
                <p> I kan booke tid 14 dage frem og alle ledige datoer vil være markeret med grøn farve. Dage vi er fuldt bookede er market med rød.</p>
              </div>
              <div className="bg-contrastCol md:mt-8 p-4 lg:block">
                <p className="mt-0 flex flex-row align-middle gap-x-2">
                  <FaCalendarAlt className="inline-block mt-0.4" />
                  <span>Dato</span>
                </p>
                <DatePicker
                  // @ts-ignore
                  disabledDays={disabledDays}
                  onSelect={handleDateChange}
                ></DatePicker>
              </div>
            </article>
            <article id="time" className="w-full">
              <div className="bg-contrastCol mt-8 p-4 lg:block">
                <h4 className="mt-0">Hvor længe skal i game?</h4>
                <p>Vi booker i tidsrummet 14.00 - 20.00, vælg hvor mange timer og hvornår i vil booke pc'er, ud fra de ledige tider for neden</p>
              </div>
              <div className="bg-contrastCol md:mt-8 p-4 lg:block">
                <p className="mt-0 flex flex-row align-middle gap-x-2">
                  <IoTime className="inline-block mt-0.4" />
                  <span>Tid</span>
                  <button className="p-4 border border-white " onClick={() => console.log(bTS)}>
                    Check State
                  </button>
                  <button className="p-4 border border-white " onClick={() => console.log(john)}>
                    Check Supabase
                  </button>
                  <button className="p-4 border border-white " onClick={() => console.log(userChoices)}>
                    Check Choices State
                  </button>
                </p>
                <div className="mt-3">
                  {!startTid.time && !slutTid.time ? (
                    ""
                  ) : (
                    <p>
                      Tidspunkt:
                      {!startTid.time ? "" : <span className="font-semibold"> {startTid.time} </span>} -{!slutTid.time ? "" : <span className="font-semibold"> {slutTid.time} </span>}
                      {!startTid.time || !slutTid.time ? (
                        ""
                      ) : (
                        <span>
                          Timer:
                          {/* @ts-ignore */}
                          {Math.abs(startTid.index - slutTid.index) / 2}
                        </span>
                      )}
                    </p>
                  )}
                </div>
                <div className=" timeslots flex gap-2 flex-wrap mt-3">
                  {bookingDateTimes.map((time: BookingTimeSlot, index: number) => (
                    <div className="relative flex gap-2 flex-wrap mt-3">
                      <input type="checkbox" name="tid" id={time.time} key={index} className="absolute z-0 opacity-0 peer" defaultChecked={bTS.includes(index)} disabled={time.booked} />
                      <label
                        htmlFor={time.time}
                        onClick={() => addTime(time.time, index)}
                        className={
                          (startTid.index !== undefined && slutTid.index !== undefined && startTid.index !== null && slutTid.index !== null && index >= startTid.index && index <= slutTid.index) || startTid.index === index || slutTid.index === index
                            ? "z-10 min-w-[85px] text-center py-2 border border-accentCol font-semibold transition ease-in-out duration-150 cursor-pointer bg-accentCol peer-disabled:bg-slate-500 peer-disabled:border-slate-500 peer-disabled:text-slate-700 peer-disabled:pointer-events-none peer-disabled:cursor-not-allowed"
                            : "z-10 min-w-[85px] text-center py-2 border border-accentCol font-semibold transition ease-in-out duration-150 cursor-pointer peer-disabled:bg-slate-500 peer-disabled:border-slate-500 peer-disabled:text-slate-700 peer-disabled:pointer-events-none peer-disabled:cursor-not-allowed"
                        }
                      >
                        {time.time}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </article>
            <article id="personalInfo" className="w-full">
              <div>
                {" "}
                <h3>INDSÆT KONTAKT FORMULAR HER TIL BOOKING</h3>
              </div>
            </article>
          </section>
        </main>
      </Layout>
    </>
  );
}

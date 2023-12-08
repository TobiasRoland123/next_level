import { Layout } from "@/Layout";
import { Hero } from "@/modules/Hero/Hero";
import { Input } from "@/components/Inputfields/Inputfield";
import { FaUserGroup } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { DatePicker } from "@/components/Calender/DatePicker";
import { useState } from "react";
import { BookingTypes } from "@/enum/BookingTimes";
import { Matcher } from "react-day-picker";
import { BTS, BookingArray, TimeSlot } from "@/Types/calendar";
import { bookings } from "@/Types/bookingTestArray";

export default function Booking() {
  const ledigeTider: Array<string> = ["14.00", "14.30", "15.00", "15.30", "16.00", "16.30", "17.00", "17.30", "18.00", "18.30", "19.00", "19.30", "20.00"];
  const [startTid, setStartTid] = useState<TimeSlot>({ time: "", index: undefined });
  const [slutTid, setSlutTid] = useState<TimeSlot>({ time: "", index: undefined });
  const [bTS, setBTS] = useState<BTS>([]);

  function checkDates() {
    console.log(bookings);
  }
  checkDates();
  function addTime(tid: string, index: number) {
    console.log("We are in");

    if (!startTid.time && !slutTid.time) {
      console.log("!startTid.time");
      setStartTid({ time: tid, index: index });
      timesArray(index, BookingTypes.StartTime);
    } else if (!slutTid.time) {
      console.log("!slutTid.time");
      if (startTid.index !== undefined && startTid.index < index) {
        console.log("startTid.index < index");
        setSlutTid({ time: tid, index: index });
        timesArray(index, BookingTypes.EndTime);
        // @ts-ignore
      } else if (startTid.index > index) {
        console.log("startTid.index > index");
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
        console.log("slutTid.index > index");
        setStartTid({ time: tid, index: index });
        timesArray(index, BookingTypes.SameEndNewStart);

        // @ts-ignore
      } else if (slutTid.index < index) {
        console.log("slutTid.index < index");
        setSlutTid({ time: tid, index: index });
        setStartTid({ time: slutTid.time, index: slutTid.index });
        timesArray(index, BookingTypes.OldStartNewEnd);
      } else if (slutTid.index === index) {
        setSlutTid({ time: "", index: undefined });
        timesArray(index, BookingTypes.Clear);
      }
    } else {
      console.log("startTid.index && slutTid.index has value");
      if (startTid.index === index) {
        console.log("startTid.index === index");
        setStartTid({ time: "", index: undefined });
        timesArray(index, BookingTypes.KeepEndRemoveStart);
      } else if (slutTid.index === index) {
        console.log("slutTid.index === index");
        setSlutTid({ time: "", index: undefined });
        timesArray(index, BookingTypes.KeepStartRemoveEnd);
      } else {
        // @ts-ignore
        const diffStart = Math.abs(startTid.index - index); // Calculate absolute difference between constant1 and targetValue

        // @ts-ignore
        const diffSlut = Math.abs(slutTid.index - index); // Calculate absolute difference between constant2 and targetValue

        if (diffStart < diffSlut) {
          console.log("Index closes to startTime");
          setStartTid({ time: tid, index: index });
          timesArray(index, BookingTypes.StartLowerEnd);
        } else if (diffStart > diffSlut) {
          console.log("Index closes to endTime");
          setSlutTid({ time: tid, index: index });
          timesArray(index, BookingTypes.StartHigherEnd);
        } else {
          console.log("Same same, tag og ændre startTiden");
          setStartTid({ time: tid, index: index });
          timesArray(index, BookingTypes.StartLowerEnd);
        }
      }
      //@ts-ignore
      console.log("vi er ved Total Time");
    }
    console.log(`StartTid: ${startTid.time}, ${startTid.index}`);
    console.log(`SlutTid: ${slutTid.time}, ${slutTid.index}`);
  }
  function timesArray(index: number, value: string) {
    console.log("bTS", bTS);
    let diffVal: number;
    let newArr: number | undefined[] = [];
    switch (value) {
      case BookingTypes.StartTime:
        setBTS([index]);
        break;
      case BookingTypes.EndTime:
        //@ts-ignore
        diffVal = index - bTS[0];
        console.log("diffVal1", diffVal);

        for (let i = 0; i <= diffVal; i++) {
          //@ts-ignore
          newArr.push(startTid.index + i);
        }
        setBTS(newArr);
        break;
      case BookingTypes.NewStartOldEnd:
        //@ts-ignore
        diffVal = startTid.index - index;
        console.log("diffVal2", diffVal);

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
        console.log("diffVal4", diffVal);

        for (let i = 0; i <= diffVal; i++) {
          //@ts-ignore
          newArr.push(index + i);
        }
        setBTS(newArr);
        break;
      case BookingTypes.OldStartNewEnd:
        //@ts-ignore
        diffVal = startTid.index - index;
        console.log("diffVal2", diffVal);

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
        console.log("diffVal2", diffVal);

        for (let i = 0; i <= diffVal; i++) {
          //@ts-ignore
          newArr.push(index + i);
        }
        setBTS(newArr);
        break;
      case BookingTypes.StartHigherEnd:
        //@ts-ignore
        diffVal = startTid.index - index;
        console.log("diffVal2", diffVal);

        for (let i = 0; i <= diffVal; i++) {
          //@ts-ignore
          newArr.push(index + i);
        }
        break;
    }
  }

  const disabledDays2 = (numberOfDays: number): Matcher | Matcher[] | undefined => {
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

  const disabledDays: Matcher | Matcher[] | undefined = disabledDays2(14);

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
                <Input type="number" max={5} min={1} className="border-white"></Input>
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
                  <button onClick={() => console.log(bTS)}>Check State</button>
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
                <div className="flex gap-2 flex-wrap mt-3">
                  {ledigeTider.map((tid: string, index: number) => (
                    //@ts-ignore
                    <div className="relative flex gap-2 flex-wrap mt-3">
                      {/* @ts-ignore */}
                      <label htmlFor={tid} onClick={() => addTime(tid, index)} className={(startTid.index !== null && startTid.index !== null && index >= startTid.index && index <= slutTid.index) || startTid.index === index || slutTid.index === index ? "z-10 min-w-[85px] text-center py-2 border border-accentCol font-semibold transition ease-in-out duration-150 cursor-pointer bg-accentCol" : " z-10 min-w-[85px] text-center py-2 border border-accentCol font-semibold transition ease-in-out duration-150 cursor-pointer"}>
                        {tid}
                      </label>
                      <input type="checkbox" name="tid" id={tid} key={index} className="absolute z-0 opacity-0 " defaultChecked={bTS.includes(index)} />
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

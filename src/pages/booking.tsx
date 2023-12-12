import { Layout } from '@/Layout';
import { Hero } from '@/modules/Hero/Hero';
import { Input } from '@/components/Inputfields/Inputfield';
import { FaUserGroup } from 'react-icons/fa6';
import { FaCalendarAlt } from 'react-icons/fa';
import { IoTime } from 'react-icons/io5';
import { DatePicker } from '@/components/Calender/DatePicker';
import { ChangeEvent, useState } from 'react';
import { BookingTypes } from '@/enum/BookingTimes';
import { Matcher } from 'react-day-picker';
import { BookingTimeSlot, PCObjects, TimeSlot, TimeSlotOptions, UserBooking } from '@/Types/calendar';
import { supabase } from '../../utils/supabaseClient';
import { Bookings } from '@/Types/Bookings';
import { futureDays, pastDays } from '@/calendarFunctions/calendarFunctions';
import timeSlots from '@/Types/TimesArray';
import { AvailibleTimeSlot } from '@/components/AvailibleTimeSlot/AvailibleTimeSlot';
import { BookedTimeSlot } from '@/components/BookedTimeSlot/BookedTimeSlot';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { FormControl, FormItem, FormLabel, FormDescription, FormMessage, FormField, Form, useFormField } from '../components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import BookingForm from '@/modules/BookingForm/BookingForm';

export async function getServerSideProps() {
  let { data: john, error } = await supabase.from('Bookings').select('*');

  return { props: { john } };
}

interface AlertDetails {
  start: string | undefined;
  slut: string;
  arr: string[];
}

export default function Booking({ john }: { john: Bookings[] }) {
  const [userChoices, setUserChoices] = useState<UserBooking | undefined>();
  const [amountValue, setAmountValue] = useState<number | ''>();
  const [openAmount, setOpenAmount] = useState(false);
  const [openDialogAlert, setOpenDialogAlert] = useState(false);
  const [alertDetail, setAlertDetail] = useState<AlertDetails>();
  const [timeChosen, setTimeChosen] = useState<TimeSlot>({ time: '', index: undefined });
  const [bookTimes, setBookTimes] = useState<string[]>([]);
  const [bookingDateTimes, setBookingDateTimes] = useState<BookingTimeSlot[]>(timeSlots);

  //Make same function and use Enums with a switch Statement
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    let amountChosen = e.target.value;
    if (e.target.value.length >= 1) {
      amountChosen = e.target.value.substring(e.target.value.length - 1, e.target.value.length);
      console.log('HER1');
    }

    if (/^[1-5]$/.test(amountChosen) || amountChosen === '') {
      console.log('HER2');
      setOpenAmount(false);
      if (/^[1-5]$/.test(amountChosen)) {
        console.log(typeof Number(amountChosen), Number(amountChosen));
        console.log('HER3');
        setUserChoices((prevData) => ({
          ...prevData,
          amount: Number(amountChosen),
        }));
        setAmountValue(Number(amountChosen));
      } else if (amountChosen === '') {
        console.log('HER4');
        console.log(typeof Number(amountChosen), Number(amountChosen));
        setUserChoices((prevData) => ({
          ...prevData,
          amount: null,
        }));
        setAmountValue('');
      }
    } else {
      console.log('HER5');
      setOpenAmount(true);
    }
  };

  const handleDateChange = (e: string) => {
    const date = new Date(e);
    const Year = date.getFullYear();
    const Month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const Day = String(date.getDate()).padStart(2, '0');

    const FormattedDate = `${Number(Year)}-${Number(Month)}-${Number(Day)}`;

    setUserChoices((prevData) => ({
      ...prevData,
      date: FormattedDate,
    }));
    bookingTimes(FormattedDate);
    editBookedTimes('', 0, BookingTypes.ClearAll);
  };

  function bookingTimes(chosenDate: string) {
    //@ts-ignore
    const matchingDate = Boolean(john.find((booking) => booking.date === chosenDate));

    if (!matchingDate) {
      setBookingDateTimes(timeSlots);
      return;
    }
    //@ts-ignore
    const dateBooking = john.find((booking) => booking.date === chosenDate);
    const PCS: PCObjects = { PC1: dateBooking?.PC1, PC2: dateBooking?.PC2, PC3: dateBooking?.PC3, PC4: dateBooking?.PC4, PC5: dateBooking?.PC5 };

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
    if (timeChosen.index === undefined) {
      // console.log('!timeChosen');
      if (userChoices?.startTime?.index || userChoices?.endTime?.index) {
        // console.log('userChoices?.startTime?.index && userChoices?.endTime?.index');
        if (userChoices?.startTime?.index === index) {
          // console.log('userChoices?.startTime?.index === index');
          editBookedTimes(tid, index, BookingTypes.SingleValueEnd);
        } else if (userChoices?.endTime?.index === index) {
          // console.log('userChoices?.endTime?.index === index');
          editBookedTimes(tid, index, BookingTypes.SingleValueStart);
          //@ts-ignore
          setTimeChosen({ time: userChoices.startTime.time, index: userChoices.startTime.index });
          //@ts-ignore
          setBookTimes([userChoices?.startTime?.time]);
          setUserChoices((prevData) => ({
            ...prevData,
            endTime: { time: '', index: undefined },
            startTime: { time: '', index: undefined },
          }));
        } else {
          // console.log('Check hvilken værdi som er tættest på tid/index, skift rundt');

          // Skal der køres script her som tjekker om der er nogle booked dates i mellem?
          //@ts-ignore
          const diffStart = Math.abs(userChoices?.startTime?.index - index); // Calculate absolute difference between constant1 and targetValue
          //@ts-ignore
          const diffSlut = Math.abs(userChoices?.endTime?.index - index); // Calculate absolute difference between constant2 and targetValue

          // console.log('diffStart:', diffStart, 'diffSlut:', diffSlut);

          if (diffStart < diffSlut) {
            // console.log"Index closes to startTime");
            editBookedTimes(tid, index, BookingTypes.UpdateStart);
            // timesArray(index, BookingTypes.StartLowerEnd);
          } else if (diffStart > diffSlut) {
            // console.log"Index closes to endTime");
            editBookedTimes(tid, index, BookingTypes.UpdateEnd);
            // timesArray(index, BookingTypes.StartHigherEnd);
          } else {
            editBookedTimes(tid, index, BookingTypes.UpdateStart);
          }
        }
      } else {
        // console.log('UserChoices Empty --> timeChosen = tid + index');
        editBookedTimes(tid, index, BookingTypes.SingleValue);
      }
    } else if (timeChosen.index === index) {
      // console.log('Sæt timeChosen === ()');
      editBookedTimes(tid, index, BookingTypes.ClearTimeChosen);
      setTimeChosen({ time: '', index: undefined });
    } else if (timeChosen.index !== index && timeChosen.index !== undefined) {
      if (timeChosen.index < index) {
        // console.log('timeChosen er lavere end index - Sæt timeChosen til starr.');
        editBookedTimes(tid, index, BookingTypes.SetStartToTimeChosen);
      } else if (timeChosen.index > index) {
        // console.log('timeChosen højere end index - Sæt timeChosen til end.');
        editBookedTimes(tid, index, BookingTypes.SetEndToTimeChosen);
      }
    }
    // console.log(timeChosen);
  }

  function editBookedTimes(tid: string, index: number, statement: string | undefined) {
    let isolatedArray: BookingTimeSlot[];
    let bookInstance: boolean;
    let newBookTimes: string[] = [];

    switch (statement) {
      case BookingTypes.SingleValue:
        setBookTimes([tid]);
        setTimeChosen({ time: tid, index: index });
        setUserChoices((prevData) => ({
          ...prevData,
          startTime: { time: '', index: undefined },
          endTime: { time: '', index: undefined },
        }));
        break;
      case BookingTypes.SingleValueEnd:
        if (userChoices?.endTime?.index !== undefined) {
          setTimeChosen({ time: userChoices.endTime.time, index: userChoices.endTime.index });
          //@ts-ignore
          setBookTimes([userChoices?.endTime?.time]);
          setUserChoices((prevData) => ({
            ...prevData,
            startTime: { time: '', index: undefined },
            endTime: { time: '', index: undefined },
          }));
        }
        break;
      case BookingTypes.SingleValueStart:
        if (userChoices?.startTime?.index !== undefined) {
          setTimeChosen({ time: userChoices.startTime.time, index: userChoices.startTime.index });
          //@ts-ignore
          setBookTimes([userChoices?.startTime?.time]);
          setUserChoices((prevData) => ({
            ...prevData,
            endTime: { time: '', index: undefined },
            startTime: { time: '', index: undefined },
          }));
        }
        break;
      case BookingTypes.ClearTimeChosen:
        setBookTimes([]);
        break;
      case BookingTypes.SetStartToTimeChosen:
        //Set startTime to same value as timeChosen and set endTime to the new value "tid" - IF no booked spaces between, else come with error
        //@ts-ignore
        isolatedArray = bookingDateTimes.slice(timeChosen.index, index + 1);
        bookInstance = isolatedArray.some((el) => el.booked === true);

        console.log('isolatedArray, SetStartToTimeChosen', isolatedArray);

        if (bookInstance) {
          // Lav en Alert Dialog som kommer op. Vælg ny tid.
          errorMessagePopUp(timeChosen.time, tid, isolatedArray);
          setOpenDialogAlert(true);
        } else {
          setUserChoices((prevData) => ({
            ...prevData,
            endTime: { time: tid, index: index },
            startTime: { time: timeChosen.time, index: timeChosen.index },
          }));
          setTimeChosen({ time: '', index: undefined });
          for (let i = 0; i < isolatedArray.length; i++) {
            newBookTimes.push(isolatedArray[i].time);
          }
          setBookTimes(newBookTimes);
        }
        break;
      case BookingTypes.SetEndToTimeChosen:
        //Set endTime to same value as timeChosen and set startTime to the new value "tid" - IF no booked spaces between, else come with error
        //@ts-ignore
        isolatedArray = bookingDateTimes.slice(index, timeChosen.index + 1);
        bookInstance = isolatedArray.some((el) => el.booked === true);

        console.log('isolatedArray, SetEndToTimeChosen', isolatedArray);

        if (bookInstance) {
          // Lav en Alert Dialog som kommer op. Vælg ny tid.
          //@ts-ignore
          errorMessagePopUp(tid, timeChosen.time, isolatedArray);
          setOpenDialogAlert(true);
        } else {
          setUserChoices((prevData) => ({
            ...prevData,
            startTime: { time: tid, index: index },
            endTime: { time: timeChosen.time, index: timeChosen.index },
          }));
          setTimeChosen({ time: '', index: undefined });
          for (let i = 0; i < isolatedArray.length; i++) {
            newBookTimes.push(isolatedArray[i].time);
          }
          setBookTimes(newBookTimes);
        }
        break;
      case BookingTypes.UpdateStart:
        //Index er tættest på start, så det er denne der skal opdateres - hvis ikke der er bookinger i vejen!
        if (userChoices?.startTime?.index !== undefined && index > userChoices?.startTime?.index) {
          //@ts-ignore
          isolatedArray = bookingDateTimes.slice(userChoices.startTime.index, index + 1);
          bookInstance = isolatedArray.some((el) => el.booked === true);

          console.log('isolatedArray, UpdateStart1', isolatedArray);
          if (bookInstance) {
            errorMessagePopUp(userChoices.startTime.time, tid, isolatedArray);
            setOpenDialogAlert(true);
          } else {
            //@ts-ignore
            let newBookArray: BookingTimeSlot[] = bookingDateTimes.slice(index, userChoices?.endTime?.index + 1);
            for (let i = 0; i < newBookArray.length; i++) {
              newBookTimes.push(newBookArray[i].time);
            }
            setBookTimes(newBookTimes);
            setUserChoices((prevData) => ({
              ...prevData,
              startTime: { time: tid, index: index },
            }));
          }
        } else if (userChoices?.startTime?.index !== undefined && index < userChoices?.startTime.index) {
          //@ts-ignore
          isolatedArray = bookingDateTimes.slice(index, userChoices.startTime.index + 1);
          bookInstance = isolatedArray.some((el) => el.booked === true);

          console.log('isolatedArray, UpdateStart2', isolatedArray);

          if (bookInstance) {
            //@ts-ignore
            errorMessagePopUp(tid, userChoices.startTime.time, isolatedArray);
            setOpenDialogAlert(true);
          } else {
            //@ts-ignore
            let newBookArray: BookingTimeSlot[] = bookingDateTimes.slice(index, userChoices?.endTime?.index + 1);
            for (let i = 0; i < newBookArray.length; i++) {
              newBookTimes.push(newBookArray[i].time);
            }
            setBookTimes(newBookTimes);
            setUserChoices((prevData) => ({
              ...prevData,
              startTime: { time: tid, index: index },
            }));
          }
        }
        break;
      case BookingTypes.UpdateEnd:
        if (userChoices?.endTime?.index !== undefined && index > userChoices?.endTime?.index) {
          //@ts-ignore
          isolatedArray = bookingDateTimes.slice(userChoices.endTime.index, index + 1);
          bookInstance = isolatedArray.some((el) => el.booked === true);

          console.log('isolatedArray, UpdateEnd1', isolatedArray);

          if (bookInstance) {
            errorMessagePopUp(userChoices.endTime.time, tid, isolatedArray);
            setOpenDialogAlert(true);
          } else {
            let newBookArray: BookingTimeSlot[] = bookingDateTimes.slice(userChoices?.startTime?.index, index + 1);
            for (let i = 0; i < newBookArray.length; i++) {
              newBookTimes.push(newBookArray[i].time);
            }
            setBookTimes(newBookTimes);
            setUserChoices((prevData) => ({
              ...prevData,
              endTime: { time: tid, index: index },
            }));
          }
        } else if (userChoices?.endTime?.index !== undefined && index < userChoices?.endTime.index) {
          //@ts-ignore
          isolatedArray = bookingDateTimes.slice(index, userChoices.endTime.index + 1);
          bookInstance = isolatedArray.some((el) => el.booked === true);

          console.log('isolatedArray, UpdateEnd2', isolatedArray);

          if (bookInstance) {
            //@ts-ignore
            errorMessagePopUp(tid, userChoices.endTime.time, isolatedArray);
            setOpenDialogAlert(true);
          } else {
            let newBookArray: BookingTimeSlot[] = bookingDateTimes.slice(userChoices?.startTime?.index, index + 1);
            for (let i = 0; i < newBookArray.length; i++) {
              newBookTimes.push(newBookArray[i].time);
            }
            setBookTimes(newBookTimes);
            setUserChoices((prevData) => ({
              ...prevData,
              endTime: { time: tid, index: index },
            }));
          }
        }
        break;
      case BookingTypes.ClearAll:
        setTimeChosen({ time: '', index: undefined });
        setBookTimes([]);
        setUserChoices((prevData) => ({
          ...prevData,
          endTime: { time: '', index: undefined },
          startTime: { time: '', index: undefined },
        }));
        break;
    }
  }

  // if ((!userChoices?.startTime?.time || userChoices?.startTime?.index !== undefined) && (!userChoices?.endTime?.time || userChoices?.endTime?.index !== undefined)) {
  //   setUserChoices((prevData) => ({
  //     ...prevData,
  //     startTime: { time: tid, index: index },
  //   }));
  //   timesArray(index, BookingTypes.StartTime);
  // } else if (!userChoices?.endTime?.time) {
  //   if (startTid.index !== undefined && startTid.index < index) {
  //     // console.log"startTid.index < index");
  //     setSlutTid({ time: tid, index: index });
  //     timesArray(index, BookingTypes.EndTime);
  //     // @ts-ignore
  //   } else if (startTid.index > index) {
  //     // console.log"startTid.index > index");
  //     setStartTid({ time: tid, index: index });
  //     setSlutTid({ time: startTid.time, index: startTid.index });
  //     //@ts-ignore
  //     setUserChoices((prevData) => ({
  //       ...prevData,
  //       startTime: { time: tid, index: index },
  //       endTime: { time: userChoices?.startTime?.time, index: userChoices?.startTime?.index },
  //     }));
  //     timesArray(index, BookingTypes.NewStartOldEnd);
  //   } else if (startTid.index === index) {
  //     setStartTid({ time: "", index: undefined });
  //     //@ts-ignore
  //     setUserChoices((prevData) => ({
  //       ...prevData,
  //       startTime: { time: "", index: undefined },
  //     }));
  //     timesArray(index, BookingTypes.Clear);
  //   }
  // } else if (!startTid.time) {
  //   // @ts-ignore
  //   if (slutTid.index > index) {
  //     // console.log"slutTid.index > index");
  //     setStartTid({ time: tid, index: index });
  //     //@ts-ignore
  //     setUserChoices((prevData) => ({
  //       ...prevData,
  //       startTime: { time: tid, index: index },
  //     }));
  //     timesArray(index, BookingTypes.SameEndNewStart);

  //     // @ts-ignore
  //   } else if (slutTid.index < index) {
  //     // console.log"slutTid.index < index");
  //     setSlutTid({ time: tid, index: index });
  //     setStartTid({ time: slutTid.time, index: slutTid.index });
  //     //@ts-ignore
  //     setUserChoices((prevData) => ({
  //       ...prevData,
  //       endTime: { time: tid, index: index },
  //       startTime: { time: userChoices?.endTime?.time, index: userChoices?.endTime?.index },
  //     }));
  //     timesArray(index, BookingTypes.OldStartNewEnd);
  //   } else if (slutTid.index === index) {
  //     setSlutTid({ time: "", index: undefined });
  //     //@ts-ignore
  //     setUserChoices((prevData) => ({
  //       ...prevData,
  //       endTime: { time: "", index: undefined },
  //     }));
  //     timesArray(index, BookingTypes.Clear);
  //   }
  // } else {
  //   // console.log"startTid.index && slutTid.index has value");
  //   if (startTid.index === index) {
  //     // console.log"startTid.index === index");
  //     setStartTid({ time: "", index: undefined });
  //     //@ts-ignore
  //     setUserChoices((prevData) => ({
  //       ...prevData,
  //       startTime: { time: "", index: undefined },
  //     }));
  //     timesArray(index, BookingTypes.KeepEndRemoveStart);
  //   } else if (slutTid.index === index) {
  //     // console.log"slutTid.index === index");
  //     setSlutTid({ time: "", index: undefined });
  //     setUserChoices((prevData) => ({
  //       ...prevData,
  //       endTime: { time: "", index: undefined },
  //     }));
  //     timesArray(index, BookingTypes.KeepStartRemoveEnd);
  //   } else {
  //     // @ts-ignore
  //     const diffStart = Math.abs(startTid.index - index); // Calculate absolute difference between constant1 and targetValue

  //     // @ts-ignore
  //     const diffSlut = Math.abs(slutTid.index - index); // Calculate absolute difference between constant2 and targetValue

  //     if (diffStart < diffSlut) {
  //       // console.log"Index closes to startTime");
  //       setStartTid({ time: tid, index: index });
  //       setUserChoices((prevData) => ({
  //         ...prevData,
  //         startTime: { time: tid, index: index },
  //       }));
  //       timesArray(index, BookingTypes.StartLowerEnd);
  //     } else if (diffStart > diffSlut) {
  //       // console.log"Index closes to endTime");
  //       setSlutTid({ time: tid, index: index });
  //       setUserChoices((prevData) => ({
  //         ...prevData,
  //         endTime: { time: tid, index: index },
  //       }));
  //       timesArray(index, BookingTypes.StartHigherEnd);
  //     } else {
  //       // console.log"Same same, tag og ændre startTiden");
  //       setStartTid({ time: tid, index: index });
  //       setUserChoices((prevData) => ({
  //         ...prevData,
  //         startTime: { time: tid, index: index },
  //       }));
  //       timesArray(index, BookingTypes.StartLowerEnd);
  //     }
  //   }
  //   //@ts-ignore
  //   // console.log"vi er ved Total Time");
  // }
  // console.log`StartTid: ${startTid.time}, ${startTid.index}`);
  // console.log`SlutTid: ${slutTid.time}, ${slutTid.index}`);

  // function timesArray(index: number, value: string) {
  //   // console.log"bTS", bTS);
  //   let diffVal: number;
  //   let newArr: number | undefined[] = [];
  //   switch (value) {
  //     case BookingTypes.StartTime:
  //       setBTS([index]);
  //       break;
  //     case BookingTypes.EndTime:
  //       //@ts-ignore
  //       diffVal = index - bTS[0];
  //       // console.log"diffVal1", diffVal);

  //       for (let i = 0; i <= diffVal; i++) {
  //         //@ts-ignore
  //         newArr.push(startTid.index + i);
  //       }
  //       setBTS(newArr);
  //       break;
  //     case BookingTypes.NewStartOldEnd:
  //       //@ts-ignore
  //       diffVal = startTid.index - index;
  //       // console.log"diffVal2", diffVal);

  //       for (let i = 0; i <= diffVal; i++) {
  //         //@ts-ignore
  //         newArr.push(index + i);
  //       }
  //       setBTS(newArr);
  //       break;
  //     case BookingTypes.Clear:
  //       setBTS([]);
  //       break;
  //     case BookingTypes.SameEndNewStart:
  //       //@ts-ignore
  //       diffVal = (index - slutTid.index) * -1;
  //       // console.log"diffVal4", diffVal);

  //       for (let i = 0; i <= diffVal; i++) {
  //         //@ts-ignore
  //         newArr.push(index + i);
  //       }
  //       setBTS(newArr);
  //       break;
  //     case BookingTypes.OldStartNewEnd:
  //       //@ts-ignore
  //       diffVal = startTid.index - index;
  //       // console.log"diffVal2", diffVal);

  //       for (let i = 0; i <= diffVal; i++) {
  //         //@ts-ignore
  //         newArr.push(index + i);
  //       }
  //       setBTS(newArr);
  //       break;
  //     case BookingTypes.KeepEndRemoveStart:
  //       setBTS([slutTid.index]);
  //       break;
  //     case BookingTypes.KeepStartRemoveEnd:
  //       setBTS([startTid.index]);
  //       break;
  //     case BookingTypes.StartLowerEnd:
  //       //@ts-ignore
  //       diffVal = index - slutTid.index;
  //       // console.log"diffVal2", diffVal);

  //       for (let i = 0; i <= diffVal; i++) {
  //         //@ts-ignore
  //         newArr.push(index + i);
  //       }
  //       setBTS(newArr);
  //       break;
  //     case BookingTypes.StartHigherEnd:
  //       //@ts-ignore
  //       diffVal = startTid.index - index;
  //       // console.log"diffVal2", diffVal);

  //       for (let i = 0; i <= diffVal; i++) {
  //         //@ts-ignore
  //         newArr.push(index + i);
  //       }
  //       break;
  //   }
  // }
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
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(currentDate.getDate()).padStart(2, '0');

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
          if (inputDate >= currentDate && inputDate <= futureDate && userChoices?.amount !== undefined) {
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
              //@ts-ignore
              const maxPC = 5 - userChoices?.amount;
              if (index < resultArray.length - 1 && slot.bookedCount !== undefined) {
                const nextSlot = resultArray[index + 1];
                //@ts-ignore
                return slot.bookedCount < maxPC && nextSlot.bookedCount < maxPC;
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

  function updateSupabase() {
    let newSupabaseObject: Bookings[];
    // @ts-ignore
    let alreadyDate: boolean = john.some((el) => el.date === userChoices?.date);
    // console.log(alreadyDate);
    if (alreadyDate) {
      //Loop through each pc and change booked === true for the times used, for every amount of PC booked
    } else {
      //Make new object for SupaBase
      // let PC1: BookingTimeSlot[] = timeSlots;
      // let PC2: BookingTimeSlot[] = timeSlots;
      // let PC3: BookingTimeSlot[] = timeSlots;
      // let PC4: BookingTimeSlot[] = timeSlots;
      // let PC5: BookingTimeSlot[] = timeSlots;

      let PCs: BookingTimeSlot[][] = [];

      for (let i = 0; i < 5; i++) {
        PCs.push(timeSlots);
      }
      // console.log('PCs', PCs);
      let startToBook = bookingDateTimes.findIndex((el) => el.time === userChoices?.startTime?.time);

      let endToBook = bookingDateTimes.findIndex((el) => el.time === userChoices?.endTime?.time);

      let arrayOfBookingTimes = bookingDateTimes.slice(startToBook, endToBook + 1);

      // console.log('startToBook:', startToBook, 'endToToBook :', endToToBook, 'arrayOfBookingTimes: ', arrayOfBookingTimes);
      let timesToBook = [];
      for (let i = 0; i < arrayOfBookingTimes.length; i++) {
        timesToBook.push(arrayOfBookingTimes[i].time);
      }
      console.log('PCs', PCs);

      //trial 48
      //@ts-ignore
      // for (let i = 0; i < userChoices?.amount; i++) {
      let bookedTimes: Array<string> = [];

      while (bookedTimes.length < timesToBook.length) {
        console.log('bookedTimes', bookedTimes);
        console.log('timesToBook', timesToBook);
        console.log(PCs.length);

        for (let i = 0; i < PCs.length; i++) {
          for (let j = 0; j < PCs[i].length; j++) {
            const currentPC = PCs[i][j];
            const currentTime = currentPC.time;
            console.log(bookedTimes);

            if (timesToBook.includes(currentTime) && !currentPC.booked && !bookedTimes.includes(currentTime)) {
              // Update the "booked" property to true
              currentPC.booked = true;

              // Add the booked time to the set
              bookedTimes.push(currentTime);
              console.log(PCs);

              // Break the inner loop since we found a match
              break;
            }
          }
        }
      }
    }

    //   for (let i = 0; i < PCs.length; i++) {
    //     console.log('bookedTimes', bookedTimes);
    //     console.log('timesToBook', timesToBook);
    //     console.log(PCs.length);
    //     if (bookedTimes.length === timesToBook.length) {
    //       return;
    //     }

    //     for (let j = 0; j < PCs[i].length; j++) {
    //       const currentPC = PCs[i][j];
    //       const currentTime = currentPC.time;
    //       console.log(bookedTimes);

    //       if (timesToBook.includes(currentTime) && !currentPC.booked && !bookedTimes.includes(currentTime)) {
    //         // Update the "booked" property to true
    //         currentPC.booked = true;

    //         // Add the booked time to the set
    //         bookedTimes.push(currentTime);

    //         // Break the inner loop since we found a match
    //         break;
    //       }
    //     }
    //   }
    // }

    // Run through every amount of PC's booked
    // @ts-ignore
    // for (let i = 0; i < userChoices.amount; i++) {
    //   console.log('User PC amount:', i);

    //   // Run through each of the PC's, if booked = false on the matching time --> Change to booked = true. if true,ignore, go to next pc
    //   //@ts-ignore
    //   for (let k = 0; k < userChoices?.amount; k++) {
    //     // console.log('PCs', [k], PCs[k]);
    //     console.log('k', [k]);

    //     if (timesToBookCheck[timesToBook.length - 1] === true) {
    //       for (let i = 0; i < timesToBook.length; i++) {
    //         timesToBookCheck[i] = false;
    //       }
    //     }

    //     // Run through all of the times to Book
    //     for (let j = 0; j < timesToBook.length; j++) {
    //       // console.log('timesToBook', [j], timesToBook[j]);
    //       console.log('j', [j]);

    //       if (timesToBookCheck[j] === true) {
    //         break;
    //       }
    //       //Now do the final check and change if false
    //       for (let l = 0; l < 13; l++) {
    //         // if()
    //         if (PCs[k][l].time === timesToBook[j] && PCs[k][l].booked === false) {
    //           // console.log('PCs', [k], [l], PCs[k][l]);
    //           // console.log("IT's FALSE!!!!", PCs[k][l].booked);
    //           console.log('l', [l]);
    //           console.log(PCs[k][l].time, PCs[k][l].booked);
    //           PCs[k][l].booked = true;
    //           timesToBookCheck[j] = true;
    //           // console.log([k], PCs);
    //           break;
    //         }
    //       }
    //     }
    //   }
    // }
    // console.log('Edited PCS', PCs);

    //     const { data, error } = await supabase
    //   .from('Bookings')
    // .insert([{ date: userChoices.date, PC1: 'otherValue' }])
    // .select();
  }

  // function bookPCTimes(PC: BookingTimeSlot[], times: string[]) {}
  function errorMessagePopUp(start: string | undefined, slut: string, arr: BookingTimeSlot[]) {
    const errorTimes: string[] = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].booked === true) {
        errorTimes.push(arr[i].time);
      }
    }
    setAlertDetail({ start: start, slut: slut, arr: errorTimes });
    console.log(alertDetail);
  }

  // const handleBookingChange = (statement: string, value: string) => {
  //   switch (statement) {
  //     case BookingTypes.FormName:
  //       // @ts-ignore
  //       form.setValue('navn', value);
  //       break;
  //     case BookingTypes.FormPhone:
  //       form.setValue('telefon', value);
  //       break;
  //     case BookingTypes.FormEmial:
  //       form.setValue('email', value);
  //       break;
  //   }
  // };

  return (
    <>
      <Layout>
        <main>
          <Hero header="Book DK's mest unikke gaming oplevelse" redWord={['unikke']} isFrontPage={false} content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non urna aliquet, mollis lacus sed, dignissim lectus. Curabitur eget diam volutpat, facilisis massa nec, varius nulla.' />
          <AnimatePresence>
            <section>
              <article id='antalGuests' className='w-full'>
                <div className='bg-contrastCol mt-8 p-4 lg:block'>
                  <h4 className='mt-0'>Hvor mange computere vil du booke?</h4>
                  <p> For at vi kan checke om der er PC'er nok til jer, så vil vi gerne vide hvor mang i kommer. </p>
                </div>
                <div className='bg-contrastCol md:mt-8 p-4 lg:block'>
                  <p className='mt-0 flex flex-row align-middle gap-x-2'>
                    <FaUserGroup className='inline-block mt-0.4' />
                    <span>Antal computere (max 5)</span>
                  </p>
                  <span className={openAmount ? 'block text-accentCol' : 'hidden'}>Du må max vælge et tal mellem 1-5.</span>
                  <Input type='number' className='border-white remove-arrow' onChange={handleAmountChange} value={amountValue}></Input>
                </div>
              </article>
              {amountValue !== undefined && Number(amountValue) < 6 && Number(amountValue) > 0 ? (
                <motion.article
                  id='date'
                  className='w-full'
                  initial={{ opacity: 0, y: '-50%' }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    duration: 0.3,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                >
                  <div className='bg-contrastCol mt-8 p-4 lg:block'>
                    <h4 className='mt-0'>Hvilken dag vil i komme?</h4>
                    <p> I kan booke tid 14 dage frem og alle ledige datoer vil være markeret med grøn farve. Dage vi er fuldt bookede er market med rød.</p>
                  </div>
                  <div className='bg-contrastCol md:mt-8 p-4 lg:block'>
                    <p className='mt-0 flex flex-row align-middle gap-x-2'>
                      <FaCalendarAlt className='inline-block mt-0.4' />
                      <span>Dato</span>
                    </p>
                    <DatePicker
                      // @ts-ignore
                      disabledDays={disabledDays}
                      onSelect={handleDateChange}
                    ></DatePicker>
                  </div>
                </motion.article>
              ) : (
                ''
              )}
              {amountValue !== undefined && Number(amountValue) < 6 && Number(amountValue) > 0 && userChoices?.date !== undefined ? (
                <motion.article
                  id='time'
                  className='w-full'
                  initial={{ opacity: 0, y: '-50%' }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    duration: 0.3,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                >
                  <div className='bg-contrastCol mt-8 p-4 lg:block'>
                    <h4 className='mt-0'>Hvor længe skal i game?</h4>
                    <p>Vi booker i tidsrummet 14.00 - 20.00, vælg hvor mange timer og hvornår i vil booke pc'er, ud fra de ledige tider for neden</p>
                  </div>
                  <div className='bg-contrastCol md:mt-8 p-4 lg:block'>
                    <p className='mt-0 flex flex-row align-middle gap-x-2'>
                      <IoTime className='inline-block mt-0.4' />
                      <span>Tid</span>
                      {/* <button className='p-4 border border-white ' onClick={() => console.log(bookTimes)}>
                        Check Booking Status
                      </button>
                      <button className='p-4 border border-white ' onClick={() => console.log(john)}>
                        Check Supabase
                      </button>
                      <button className='p-4 border border-white ' onClick={() => console.log(userChoices)}>
                        Check Choices State
                      </button>
                      <button className='p-4 border border-white ' onClick={() => console.log(timeChosen)}>
                        Check timeChosen
                      </button>
                      <button className='p-4 border border-white ' onClick={() => console.log(bookingDateTimes)}>
                        Check Boking Date Times
                      </button> */}
                    </p>
                    <div className='mt-3'>
                      {userChoices?.startTime?.index === undefined || userChoices?.endTime?.time === undefined ? (
                        <p>
                          {' '}
                          Tispunkt: <span className='font-semibold'> {timeChosen.time} </span>
                        </p>
                      ) : (
                        <p>
                          Tidspunkt:
                          <span className='font-semibold'> {userChoices?.startTime?.time} </span> -<span className='font-semibold'> {userChoices?.endTime?.time} </span>
                          <span>
                            Timer:
                            {/* @ts-ignore */}
                            {Math.abs(userChoices?.startTime?.index - userChoices?.endTime?.index) / 2}
                          </span>
                        </p>
                      )}
                    </div>
                    <div className=' timeslots flex gap-2 flex-wrap mt-3'>
                      {bookingDateTimes.map((time: BookingTimeSlot, index: number) => (
                        <div className='relative flex gap-2 flex-wrap mt-3'>
                          {time.booked ? (
                            <BookedTimeSlot time={time} index={index} allTimes={bookingDateTimes} userChoices={userChoices} />
                          ) : (
                            //  <input type="checkbox" name="tid" id={time.time} key={index} className="absolute z-0 opacity-0 peer" defaultChecked={bTS.includes(index)} disabled={time.booked} />
                            // <label
                            //   htmlFor={time.time}
                            //   onClick={() => addTime(time.time, index)}
                            //   className={
                            //     (startTid.index !== undefined && slutTid.index !== undefined && startTid.index !== null && slutTid.index !== null && index >= startTid.index && index <= slutTid.index) || startTid.index === index || slutTid.index === index
                            //       ? "z-10 min-w-[85px] text-center py-2 border border-accentCol font-semibold transition ease-in-out duration-150 cursor-pointer bg-accentCol peer-disabled:bg-slate-500 peer-disabled:border-slate-500 peer-disabled:text-slate-700 peer-disabled:pointer-events-none peer-disabled:cursor-not-allowed"
                            //       : "z-10 min-w-[85px] text-center py-2 border border-accentCol font-semibold transition ease-in-out duration-150 cursor-pointer peer-disabled:bg-slate-500 peer-disabled:border-slate-500 peer-disabled:text-slate-700 peer-disabled:pointer-events-none peer-disabled:cursor-not-allowed"
                            //   }
                            // >
                            //   {time.time}
                            // </label>
                            <AvailibleTimeSlot className={bookTimes.includes(time.time) ? 'z-10 min-w-[85px] text-center py-2 border border-accentCol font-semibold transition ease-in-out duration-150 cursor-pointer bg-accentCol' : 'z-10 min-w-[85px] text-center py-2 border border-accentCol font-semibold transition ease-in-out duration-150 cursor-pointer'} defaultChecked={bookTimes.includes(time.time)} index={index} onClick={() => addTime(time.time, index)} time={time} />
                          )}
                        </div>
                      ))}
                      <AlertDialog open={openDialogAlert} onOpenChange={setOpenDialogAlert}>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Du kan ikke booke her.</AlertDialogTitle>
                            <AlertDialogDescription>
                              Det er ikke muligt at booke fra {alertDetail?.start} til {alertDetail?.slut}, da følgende tider er booket:{' '}
                              <ul className='flex flex-col gap-x-1'>
                                {alertDetail?.arr.map((tid) => (
                                  <li>{tid}</li>
                                ))}
                              </ul>
                              Vælg en af de gyldige tider.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </motion.article>
              ) : (
                ''
              )}
              {amountValue !== undefined && Number(amountValue) < 6 && Number(amountValue) > 0 && userChoices?.date !== undefined && userChoices?.startTime?.index !== undefined && userChoices.endTime?.index !== undefined ? (
                <motion.article
                  id='personalInfo'
                  className='w-full'
                  initial={{ opacity: 0, y: '-50%' }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    duration: 0.3,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                >
                  <BookingForm userChoices={userChoices} />
                </motion.article>
              ) : (
                ''
              )}
            </section>
          </AnimatePresence>
        </main>
      </Layout>
    </>
  );
}

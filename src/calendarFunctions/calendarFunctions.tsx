export function pastDays() {
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 1);
  const pYear = pastDate.getFullYear();
  const pMonth = String(pastDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const pDay = String(pastDate.getDate()).padStart(2, "0");

  const pFormattedDate = `${Number(pYear)}, ${Number(pMonth)}, ${Number(pDay)}`;
  //@ts-ignore
  const pastDisabledDays: Date = { from: new Date(2023, 1, 1), to: new Date(pFormattedDate) };

  return pastDisabledDays;
}

export function futureDays(days: number) {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + days);
  const fYear = futureDate.getFullYear();
  const fMonth = String(futureDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const fDay = String(futureDate.getDate()).padStart(2, "0");

  // Format the date as "YYYY, MM, DD"
  const fFormattedDate = `${Number(fYear)}, ${Number(fMonth)}, ${Number(fDay)}`;
  //@ts-ignore
  const pastDisabledDays: Date = { from: new Date(fFormattedDate), to: new Date(2050, 1, 1) };

  return pastDisabledDays;
}

  export const formattedDate = (date: string) => {
    const dateDate = new Date(date);

    // Days of the week and months in Danish
    const weekDays = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];
    const months = ['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december'];

    // Get day, month, and year
    const dayOfWeek = weekDays[dateDate.getDay()];
    const dayOfMonth = dateDate.getDate();
    const month = months[dateDate.getMonth()];
    const year = dateDate.getFullYear();

    // Formatted output string
    return `${dayOfWeek} d. ${dayOfMonth} ${month}, ${year}`;
  };

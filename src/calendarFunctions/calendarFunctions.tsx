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

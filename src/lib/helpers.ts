import { Booking } from "@/types/rooming";

export function formatDateRange(bookings: Booking[]): string {
  if (bookings.length === 0) return "";

  const sortedBookings = bookings.sort(
    (a, b) =>
      new Date(a.checkInDate).getTime() - new Date(b.checkInDate).getTime()
  );

  const startDate = new Date(sortedBookings[0].checkInDate);
  const endDate = new Date(
    sortedBookings[sortedBookings.length - 1].checkOutDate
  );

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const startStr = startDate.toLocaleDateString("en-US", options);
  const endStr = endDate.toLocaleDateString("en-US", options);

  return `${startStr} – ${endStr}`;
}

export function formatCutOffDate(cutOffDate: string) {
  const date = new Date(cutOffDate);
  const month = date
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase();
  const day = date.getDate();
  return { month, day };
}

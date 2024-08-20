import { bookingList } from '@/assets/data';
import { Booking } from '@/types/booking';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

type CheckAvailabilityParams = {
  roomId: string;
  startTime: string;
  endTime: string;
};

export const checkAvailability = ({
  roomId,
  startTime,
  endTime
}: CheckAvailabilityParams): boolean => {
  const roomBookings = bookingList.filter(booking => booking.roomId === roomId);

  const requestedStart = dayjs(startTime);
  const requestedEnd = dayjs(endTime);

  return roomBookings.every(booking => {
    const bookingStart = dayjs(booking.startTime);
    const bookingEnd = dayjs(booking.endTime);

    return (
      requestedStart.isSameOrAfter(bookingEnd) ||
      requestedEnd.isSameOrBefore(bookingStart)
    );
  });
};

export const getAllRoomBookings = (
  roomId: string
): {
  today: Booking[];
  thisWeek: Booking[];
  nextWeek: Booking[];
  thisMonth: Booking[];
} => {
  const today = dayjs().startOf('day');
  const endOfToday = today.endOf('day');

  const startOfThisWeek = today.startOf('week');
  const endOfThisWeek = today.endOf('week');

  const startOfNextWeek = endOfThisWeek.add(1, 'day');
  const endOfNextWeek = startOfNextWeek.endOf('week');

  const startOfThisMonth = today.startOf('month');
  const endOfThisMonth = today.endOf('month');

  const roomBookings = bookingList.filter(booking => booking.roomId === roomId);

  const todayBookings = roomBookings
    .filter(booking =>
      dayjs(booking.startTime).isBetween(today, endOfToday, null, '[)')
    )
    .sort((a, b) => dayjs(a.startTime).diff(dayjs(b.startTime)));

  const thisWeekBookings = roomBookings
    .filter(booking =>
      dayjs(booking.startTime).isBetween(
        startOfThisWeek,
        endOfThisWeek,
        null,
        '[)'
      )
    )
    .sort((a, b) => dayjs(a.startTime).diff(dayjs(b.startTime)));

  const nextWeekBookings = roomBookings
    .filter(booking =>
      dayjs(booking.startTime).isBetween(
        startOfNextWeek,
        endOfNextWeek,
        null,
        '[)'
      )
    )
    .sort((a, b) => dayjs(a.startTime).diff(dayjs(b.startTime)));

  const thisMonthBookings = roomBookings
    .filter(booking =>
      dayjs(booking.startTime).isBetween(
        startOfThisMonth,
        endOfThisMonth,
        null,
        '[)'
      )
    )
    .sort((a, b) => dayjs(a.startTime).diff(dayjs(b.startTime)));

  return {
    today: todayBookings,
    thisWeek: thisWeekBookings,
    nextWeek: nextWeekBookings,
    thisMonth: thisMonthBookings
  };
};

export const groupByDate = (bookings: Booking[]): Booking[][] => {
  const groupedBookings = bookings.reduce(
    (acc: Record<string, Booking[]>, booking) => {
      const date = dayjs(booking.startTime).format('YYYY-MM-DD');

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(booking);

      return acc;
    },
    {}
  );

  return Object.values(groupedBookings);
};

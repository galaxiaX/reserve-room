'use client';

import CheckAvailability from '@/components/booking/check-availability';
import RoomList from '@/components/booking/room-list';
import Link from 'next/link';
import { FaArrowLeftLong } from 'react-icons/fa6';

const BookingView = () => {
  return (
    <main className='flex min-h-screen flex-col gap-16 bg-gray-100 p-8'>
      <Link
        href='/'
        className='absolute left-16 top-4 flex h-10 items-center text-3xl'
      >
        <FaArrowLeftLong />
      </Link>
      <CheckAvailability />
      <RoomList />
    </main>
  );
};

export default BookingView;

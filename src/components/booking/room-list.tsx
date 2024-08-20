import { ROOMS } from '@/assets/data';
import Link from 'next/link';

const RoomList = () => {
  return (
    <section className='flex flex-col items-center gap-8'>
      <h2 className='text-xl font-semibold'>Room List</h2>

      <div className='grid w-full max-w-md divide-y overflow-hidden rounded-xl sm:grid-cols-3 sm:divide-x sm:divide-y-0'>
        {ROOMS.map(room => (
          <Link
            key={room}
            href={`/booking/${room}?filter=this-week`}
            className='bg-sky-500 py-4 text-center text-white duration-300 hover:bg-sky-400'
          >
            {room}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RoomList;

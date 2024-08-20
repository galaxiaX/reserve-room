import { randomDarkColor } from '@/utils/random-color';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <div className='grid overflow-hidden rounded-lg text-center text-4xl'>
        <Link
          href='/gallery'
          style={{ backgroundColor: randomDarkColor() }}
          className='bg-sky-500 px-10 py-4 text-white duration-300 hover:opacity-90'
        >
          <span className='drop-shadow'>Gallery</span>
        </Link>

        <Link
          href='/booking'
          style={{ backgroundColor: randomDarkColor() }}
          className='px-10 py-4 text-white duration-300 hover:opacity-90'
        >
          <span className='drop-shadow'>Booking</span>
        </Link>
      </div>
    </main>
  );
}

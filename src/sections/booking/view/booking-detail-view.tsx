'use client';

import { Booking } from '@/types/booking';
import { groupByDate } from '@/utils/booking-tools';
import { randomColor } from '@/utils/random-color';
import dayjs from 'dayjs';
import { Lato } from 'next/font/google';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900']
});

type Props = {
  roomId: string;
  reserveData: {
    today: Booking[];
    thisWeek: Booking[];
    nextWeek: Booking[];
    thisMonth: Booking[];
  };
};

const BookingDetailView = ({ roomId, reserveData }: Props) => {
  const searchParams = useSearchParams();

  const currentFilter = searchParams.get('filter') || 'this-week';

  const tabList = [
    {
      label: 'THIS WEEK',
      value: 'this-week',
      data: groupByDate(reserveData.thisWeek)
    },
    {
      label: 'NEXT WEEK',
      value: 'next-week',
      data: groupByDate(reserveData.nextWeek)
    },
    {
      label: 'THIS MONTH',
      value: 'this-month',
      data: groupByDate(reserveData.thisMonth)
    }
  ];

  const currentTab = tabList.find(tab => tab.value === currentFilter);

  console.log(tabList);
  const today = dayjs().format('YYYY-MM-DD');
  const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');
  const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');

  return (
    <main className='relative min-h-screen bg-gradient-to-tr from-[#91A2C6] to-[#BDC0C9] p-16'>
      <Link
        href='/booking'
        className='absolute left-16 top-4 flex h-10 items-center text-3xl'
      >
        <FaArrowLeftLong />
      </Link>

      <div className='mx-auto grid h-fit min-h-[800px] w-full max-w-[1440px] md:grid-cols-10'>
        <div className='relative flex h-full flex-col bg-[#46529D] text-white md:col-span-4'>
          <div
            className={`w-[85%] shrink-0 self-end bg-[#2EBAEE] px-10 py-5 pt-10 text-5xl font-semibold drop-shadow-[0_4px_32px_#39406F40]`}
          >
            {roomId}
          </div>

          <div className='flex w-full grow flex-col self-end pt-24'>
            <div className='flex w-full flex-col gap-12 self-end pl-[15%]'>
              <p className={`${lato.className} text-lg`}>Upcoming</p>
              <div
                className={`${lato.className} flex flex-col gap-4 text-6xl font-light`}
              >
                <p className='opacity-50'>{dayjs().format('dddd')}</p>
                <p>{dayjs().format('DD MMM')}</p>
              </div>

              <div className='mt-8 flex flex-col gap-6 pb-3 pr-12'>
                {reserveData.today.length === 0 && (
                  <div>
                    <p className='opacity-50'>No bookings today</p>
                  </div>
                )}

                {reserveData.today?.at(0) && (
                  <div className='flex flex-col gap-1'>
                    <p className='opacity-50'>
                      {dayjs(reserveData.today[0].startTime).format('H:mm')} -{' '}
                      {dayjs(reserveData.today[0].endTime).format('H:mm')}
                    </p>
                    <p>{reserveData.today[0].title}</p>
                  </div>
                )}
              </div>
            </div>

            {reserveData.today.length > 1 && (
              <div className='flex w-full grow flex-col gap-12 self-end bg-[#4D59A1] pb-10 pl-[15%] pt-3 md:pb-0'>
                <div className='flex flex-col gap-6 pr-12'>
                  {reserveData.today.map((booking, index) => {
                    if (index !== 0) {
                      return (
                        <div key={booking.id} className='flex flex-col gap-1'>
                          <p className='opacity-50'>
                            {dayjs(booking.startTime).format('H:mm')} -{' '}
                            {dayjs(booking.endTime).format('H:mm')}
                          </p>
                          <p>{booking.title}</p>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-col bg-white md:col-span-6'>
          <div className='flex h-[108px] shrink-0 items-end bg-[#EFEEEC] px-8'>
            <div className='relative grid grid-cols-3'>
              {tabList.map(tab => (
                <Link
                  key={tab.value}
                  href={`/booking/${roomId}?filter=${tab.value}`}
                  className={`${
                    currentFilter === tab.value ? '' : 'opacity-50'
                  } px-8 py-4 font-medium duration-300`}
                >
                  {tab.label}
                </Link>
              ))}

              <div
                className={`${currentFilter === tabList?.at(0)?.value ? 'left-[calc(16.5%-25px)]' : currentFilter === tabList?.at(1)?.value ? 'left-[calc(50%-25px)]' : 'left-[calc(83.5%-25px)]'} absolute bottom-0 h-[4px] w-[50px] bg-[#707FDD] drop-shadow-[0_-1px_16px_#707FDDBF] duration-300`}
              ></div>
            </div>
          </div>

          <div className='relative flex grow flex-col gap-12 bg-white pb-12 drop-shadow-[0_0_30px_#00000024]'>
            <div className='absolute left-[3.215rem] top-0 -z-10 h-full w-[1px] border-r border-dashed'></div>
            {currentTab?.data.length === 0 && (
              <div className='py-10 text-center opacity-50'>No bookings</div>
            )}
            {currentTab?.data.map((bookingGroup, index) => (
              <div key={index} className='flex flex-col gap-6'>
                {bookingGroup?.at(0) && (
                  <div className='border-y border-[#ECECEC] bg-[#F7F7F7] px-20 py-3 font-semibold text-[#787878]'>
                    <p>
                      {today ===
                      dayjs(bookingGroup[0].startTime).format('YYYY-MM-DD')
                        ? `Today (${dayjs(bookingGroup[0].startTime).format('dddd, DD MMM')})`
                        : tomorrow ===
                            dayjs(bookingGroup[0].startTime).format(
                              'YYYY-MM-DD'
                            )
                          ? `Tomorrow (${dayjs(bookingGroup[0].startTime).format('dddd, DD MMM')})`
                          : yesterday ===
                              dayjs(bookingGroup[0].startTime).format(
                                'YYYY-MM-DD'
                              )
                            ? `Yesterday (${dayjs(bookingGroup[0].startTime).format('dddd, DD MMM')})`
                            : dayjs(bookingGroup[0].startTime).format(
                                'dddd, DD MMM'
                              )}
                    </p>
                  </div>
                )}

                <div key={index} className='flex flex-col gap-6 px-20'>
                  {bookingGroup.map(booking => (
                    <div key={booking.id} className='flex flex-col text-sm'>
                      <div className='relative'>
                        <span
                          style={{ backgroundColor: randomColor() }}
                          className='absolute -left-8 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full'
                        ></span>
                        <p className='opacity-50'>
                          {dayjs(booking.startTime).format('H:mm')} -{' '}
                          {dayjs(booking.endTime).format('H:mm')}
                        </p>
                      </div>
                      <p>{booking.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookingDetailView;

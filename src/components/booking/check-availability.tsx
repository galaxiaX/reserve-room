import { ROOMS } from '@/assets/data';
import { checkAvailability } from '@/utils/booking-tools';
import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const CheckAvailability = () => {
  const [roomId, setRoomId] = useState<string>(ROOMS[0]);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

  const [showRoomList, setShowRoomList] = useState<boolean>(false);

  const toggleRoomMenu = () => {
    setShowRoomList(!showRoomList);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isAvailable = checkAvailability({
      roomId,
      startTime,
      endTime
    });

    if (isAvailable) {
      Swal.fire({
        title: 'Room is available',
        icon: 'success',
        timer: 5000
      });
    } else {
      Swal.fire({
        title: 'Room is not available',
        icon: 'error',
        timer: 5000
      });
    }
  };

  return (
    <section className='flex flex-col items-center gap-8'>
      <h1 className='text-2xl font-bold'>Venue Booking System</h1>
      <form
        className='flex w-full max-w-md flex-col gap-4'
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col gap-2'>
          <p className='text-sm'>Room</p>
          <div className='relative w-full'>
            <button
              type='button'
              onClick={toggleRoomMenu}
              className='flex w-full items-center justify-between rounded-md bg-white px-4 py-2'
            >
              {roomId}

              <FaAngleDown />
            </button>

            {showRoomList && (
              <div className='absolute top-[120%] flex w-full flex-col divide-y overflow-hidden rounded-md shadow-lg'>
                {ROOMS.map(room => (
                  <button
                    key={room}
                    type='button'
                    onClick={() => {
                      setRoomId(room);
                      toggleRoomMenu();
                    }}
                    className={`${room === roomId && 'text-blue-500'} w-full bg-white px-4 py-2 text-start duration-300`}
                  >
                    {room}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <label className='flex flex-col gap-2'>
          <p className='text-sm'>Start Time</p>
          <input
            type='datetime-local'
            placeholder='Start Time'
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            className='rounded-md p-2'
          />
        </label>

        <label className='flex flex-col gap-2'>
          <p className='text-sm'>End Time</p>
          <input
            type='datetime-local'
            placeholder='End Time'
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
            className='rounded-md p-2'
          />
        </label>
        <button
          type='submit'
          disabled={!startTime || !endTime || !roomId}
          className='rounded-md bg-blue-500 p-2 text-white duration-300 hover:bg-blue-400 disabled:bg-gray-300'
        >
          Check Availability
        </button>
      </form>
    </section>
  );
};

export default CheckAvailability;

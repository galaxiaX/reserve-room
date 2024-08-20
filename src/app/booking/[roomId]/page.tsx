import BookingDetailView from '@/sections/booking/view/booking-detail-view';
import { getAllRoomBookings } from '@/utils/booking-tools';
import { Metadata } from 'next';

type Props = {
  params: {
    roomId: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { roomId } = params;
  return {
    title: `Room Details - ${roomId}`
  };
}

const RoomDetailPage = ({ params }: Props) => {
  const { roomId } = params;

  const reserveData = getAllRoomBookings(roomId);

  return <BookingDetailView roomId={roomId} reserveData={reserveData} />;
};

export default RoomDetailPage;

import { render, screen } from '@testing-library/react';
import RoomingCard from '../../components/RoomingCard';
import { RoomingList } from '../../types/rooming';

const mockRoomingList: RoomingList = {
  roomingListId: 1,
  eventId: 1,
  eventName: 'Rolling Loud',
  hotelId: 101,
  rfpName: 'ACL-2025',
  cutOffDate: '2025-09-30',
  status: 'completed',
  agreement_type: 'leisure',
  bookings: [
    {
      bookingId: 1,
      hotelId: 101,
      eventId: 1,
      guestName: 'John Doe',
      guestPhoneNumber: '1234567890',
      checkInDate: '2025-09-01',
      checkOutDate: '2025-09-05'
    }
  ]
};

describe('RoomingCard', () => {
  it('renders rooming list information correctly', () => {
    render(<RoomingCard roomingList={mockRoomingList} />);

    expect(screen.getByText('ACL-2025')).toBeInTheDocument();
    expect(screen.getByText('leisure')).toBeInTheDocument();
    expect(screen.getByText('View Bookings (1)')).toBeInTheDocument();
  });

  it('displays booking count correctly', () => {
    render(<RoomingCard roomingList={mockRoomingList} />);

    expect(screen.getByText('View Bookings (1)')).toBeInTheDocument();
  });
});
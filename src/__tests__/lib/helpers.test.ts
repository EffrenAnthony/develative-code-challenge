import { formatDateRange, formatCutOffDate } from '../../lib/helpers';
import { Booking } from '../../types/rooming';

describe('helpers', () => {
  describe('formatDateRange', () => {
    it('returns empty string for no bookings', () => {
      expect(formatDateRange([])).toBe('');
    });

    it('formats date range correctly', () => {
      const bookings: Booking[] = [
        {
          bookingId: 1,
          hotelId: 101,
          eventId: 1,
          guestName: 'John Doe',
          guestPhoneNumber: '1234567890',
          checkInDate: '2025-09-01',
          checkOutDate: '2025-09-05'
        },
        {
          bookingId: 2,
          hotelId: 101,
          eventId: 1,
          guestName: 'Jane Doe',
          guestPhoneNumber: '0987654321',
          checkInDate: '2025-09-02',
          checkOutDate: '2025-09-06'
        }
      ];

      const result = formatDateRange(bookings);
      expect(result).toBe('Aug 31, 2025 – Sep 5, 2025');
    });
  });

  describe('formatCutOffDate', () => {
    it('formats cut-off date correctly', () => {
      const result = formatCutOffDate('2025-09-30');
      expect(result).toEqual({
        month: 'SEP',
        day: 29
      });
    });
  });
});
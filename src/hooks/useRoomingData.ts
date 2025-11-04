import { useQuery } from '@tanstack/react-query';
import { RoomingList } from '../types/rooming';

export type { RoomingList };

export function useRoomingData() {
  return useQuery<RoomingList[]>({
    queryKey: ['rooming'],
    queryFn: async () => {
      const response = await fetch('/api/rooming');
      if (!response.ok) {
        throw new Error('Failed to fetch rooming data');
      }
      return response.json();
    },
  });
}
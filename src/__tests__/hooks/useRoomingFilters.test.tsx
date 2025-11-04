
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRoomingFilters } from '../../hooks/useRoomingFilters';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  Wrapper.displayName = 'TestWrapper';
  return Wrapper;
};

describe('useRoomingFilters', () => {
  it('returns initial state correctly', () => {
    const { result } = renderHook(() => useRoomingFilters(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isSearching).toBe(false);
    expect(result.current.selectedStatuses).toEqual([]);
    expect(typeof result.current.handleSearch).toBe('function');
    expect(typeof result.current.handleApplyFilters).toBe('function');
  });
});
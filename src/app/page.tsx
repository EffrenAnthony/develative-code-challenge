'use client';

import { useState, useMemo } from 'react';
import { useRoomingData, RoomingList } from '../hooks/useRoomingData';
import RoomingCard from '../components/RoomingCard';
import RoomingDivider from '@/components/RoomingDivider';
import SearchBar from '../components/SearchBar';
import StatusFilter from '../components/StatusFilter';
import SkeletonLoader from '../components/SkeletonLoader';

export default function Home() {
  const { data, isLoading, error } = useRoomingData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Get unique statuses from data
  const uniqueStatuses = useMemo(() => {
    if (!data) return [];
    const statuses = new Set(data.map(item => item.status));
    return Array.from(statuses);
  }, [data]);

  // Filter and search logic
  const filteredGroupedData = useMemo(() => {
    if (!data) return {};

    let filtered = data;

    // Apply status filter
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter(item => selectedStatuses.includes(item.status));
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.rfpName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.agreement_type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Group by eventName
    return filtered.reduce((acc, rooming) => {
      const event = rooming.eventName;
      if (!acc[event]) acc[event] = [];
      acc[event].push(rooming);
      return acc;
    }, {} as Record<string, RoomingList[]>);
  }, [data, searchTerm, selectedStatuses]);

  const handleSearch = (value: string) => {
    setIsSearching(true);
    setTimeout(() => {
      setSearchTerm(value);
      setIsSearching(false);
    }, 500); // 500ms debounce
  };

  const handleApplyFilters = (statuses: string[]) => {
    setSelectedStatuses(statuses);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Bookings by Event</h1>

      {/* Search and Filter Controls */}
      <div className="flex gap-4 mb-6">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search by RFP name or agreement type..."
        />
        <StatusFilter
          statuses={uniqueStatuses}
          selectedStatuses={selectedStatuses}
          onApplyFilters={handleApplyFilters}
        />
      </div>

      {/* Content */}
      {isSearching ? (
        <SkeletonLoader />
      ) : (
        Object.entries(filteredGroupedData).map(([eventName, roomings]) => (
          <div key={eventName} className="mb-8">
            <RoomingDivider eventName={eventName} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {roomings.map((rooming) => (
                <RoomingCard key={rooming.roomingListId} roomingList={rooming} />
              ))}
            </div>
          </div>
        ))
      )}

      {/* No results message */}
      {!isSearching && Object.keys(filteredGroupedData).length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No rooming lists found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

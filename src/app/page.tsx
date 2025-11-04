'use client';

import RoomingCard from '../components/RoomingCard';
import RoomingDivider from '@/components/RoomingDivider';
import SearchBar from '../components/SearchBar';
import StatusFilter from '../components/StatusFilter';
import SkeletonLoader from '../components/SkeletonLoader';
import { useRoomingFilters } from '../hooks/useRoomingFilters';

export default function Home() {
  const {
    data: filteredGroupedData,
    isLoading,
    error,
    isSearching,
    uniqueStatuses,
    selectedStatuses,
    handleSearch,
    handleApplyFilters,
  } = useRoomingFilters();

  if (isLoading) return <div className="container mx-auto p-4"><SkeletonLoader /></div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Rooming List Management: Events</h1>

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
            <div className="flex gap-4 overflow-x-auto pb-4">
              {roomings.map((rooming) => (
                <div key={rooming.roomingListId} className="shrink-0 w-80">
                  <RoomingCard roomingList={rooming} />
                </div>
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

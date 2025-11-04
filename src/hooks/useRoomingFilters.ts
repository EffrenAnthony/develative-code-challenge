import { useState, useMemo } from 'react';
import { useRoomingData, RoomingList } from './useRoomingData';

export function useRoomingFilters() {
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

  return {
    data: filteredGroupedData,
    isLoading,
    error,
    isSearching,
    uniqueStatuses,
    selectedStatuses,
    handleSearch,
    handleApplyFilters,
  };
}
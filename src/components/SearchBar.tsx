import { useCallback } from 'react';
import { Input } from './ui/input';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "Search..." }: SearchBarProps) {
  const debouncedSearch = useCallback(
    (value: string) => {
      setTimeout(() => {
        onSearch(value);
      }, 500); // 500ms debounce
    },
    [onSearch]
  );

  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        placeholder={placeholder}
        className="pl-10"
        onChange={(e) => debouncedSearch(e.target.value)}
      />
    </div>
  );
}
import { useState } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Filter } from 'lucide-react';

interface StatusFilterProps {
  statuses: string[];
  selectedStatuses: string[];
  onApplyFilters: (statuses: string[]) => void;
}

export default function StatusFilter({ statuses, selectedStatuses, onApplyFilters }: StatusFilterProps) {
  const [tempSelectedStatuses, setTempSelectedStatuses] = useState<string[]>(selectedStatuses);

  const handleStatusToggle = (status: string, checked: boolean) => {
    setTempSelectedStatuses(prev =>
      checked
        ? [...prev, status]
        : prev.filter(s => s !== status)
    );
  };

  const handleApplyFilters = () => {
    onApplyFilters(tempSelectedStatuses);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter by Status
          {selectedStatuses.length > 0 && (
            <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
              {selectedStatuses.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {statuses.map((status) => (
          <DropdownMenuItem
            key={status}
            className="flex items-center space-x-2 cursor-pointer"
            onSelect={(e) => e.preventDefault()}
          >
            <Checkbox
              id={status}
              checked={tempSelectedStatuses.includes(status)}
              onCheckedChange={(checked) => handleStatusToggle(status, checked as boolean)}
            />
            <label
              htmlFor={status}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </label>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            variant="default"
            size="sm"
            className="w-full"
            onClick={handleApplyFilters}
          >
            Save
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatusFilter from '../../components/StatusFilter';

describe('StatusFilter', () => {
  const mockOnApplyFilters = jest.fn();
  const statuses = ['completed', 'received', 'archived'];

  beforeEach(() => {
    mockOnApplyFilters.mockClear();
  });

  it('renders filter button', () => {
    render(
      <StatusFilter
        statuses={statuses}
        selectedStatuses={[]}
        onApplyFilters={mockOnApplyFilters}
      />
    );

    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  it('shows selected count when filters are applied', () => {
    render(
      <StatusFilter
        statuses={statuses}
        selectedStatuses={['completed', 'received']}
        onApplyFilters={mockOnApplyFilters}
      />
    );

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders filter button', () => {
    render(
      <StatusFilter
        statuses={statuses}
        selectedStatuses={[]}
        onApplyFilters={mockOnApplyFilters}
      />
    );

    expect(screen.getByText('Filter by Status')).toBeInTheDocument();
  });
});
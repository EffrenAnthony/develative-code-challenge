import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../../components/SearchBar';

describe('SearchBar', () => {
  it('renders search input with placeholder', () => {
    render(<SearchBar onSearch={() => {}} placeholder="Test search" />);

    const input = screen.getByPlaceholderText('Test search');
    expect(input).toBeInTheDocument();
  });

  it('renders search icon', () => {
    render(<SearchBar onSearch={() => {}} />);

    const searchIcon = document.querySelector('svg');
    expect(searchIcon).toBeInTheDocument();
  });

  it('calls onSearch with debounced value', async () => {
    const mockOnSearch = jest.fn();
    const user = userEvent.setup();

    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'test search');

    // Wait for debounce
    await new Promise(resolve => setTimeout(resolve, 600));

    expect(mockOnSearch).toHaveBeenCalledWith('test search');
  });
});
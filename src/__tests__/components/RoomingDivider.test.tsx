import { render, screen } from '@testing-library/react';
import RoomingDivider from '../../components/RoomingDivider';

describe('RoomingDivider', () => {
  it('renders event name correctly', () => {
    render(<RoomingDivider eventName="Rolling Loud" />);

    expect(screen.getByText('Rolling Loud')).toBeInTheDocument();
  });

  it('renders horizontal lines', () => {
    render(<RoomingDivider eventName="Test Event" />);

    const hrs = screen.getAllByRole('separator');
    expect(hrs).toHaveLength(2);
  });
});
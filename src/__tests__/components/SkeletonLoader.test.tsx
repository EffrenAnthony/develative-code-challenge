import { render } from '@testing-library/react';
import SkeletonLoader from '../../components/SkeletonLoader';

describe('SkeletonLoader', () => {
  it('renders skeleton elements', () => {
    render(<SkeletonLoader />);

    const skeletons = document.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders skeleton elements', () => {
    render(<SkeletonLoader />);

    const skeletons = document.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
import { render, screen } from '@testing-library/react';
import Home from './Home';

jest.mock('../../Products/hooks/useScreenSize', () => ({
  __esModule: true,
  default: () => ({
    isSmallScreen: false,
  }),
}));

describe('Home', () => {
  it('should render successfully', () => {
    render(<Home />);
  });
});

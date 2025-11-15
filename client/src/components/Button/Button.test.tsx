import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

const handleClick = jest.fn();

describe('Button Component', () => {
  beforeEach(() => {
    handleClick.mockClear();
  });

  it('should render with the correct children text', () => {
    render(<Button>Click Me</Button>);

    const buttonElement = screen.getByRole('button', { name: /click me/i });

    expect(buttonElement).toBeInTheDocument();
  });

  it('should call the onClick handler when clicked', () => {
    render(<Button onClick={handleClick}>Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });

    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when the disabled prop is true', () => {
    render(
      <Button onClick={handleClick} disabled>
        Click Me
      </Button>
    );
    const buttonElement = screen.getByRole('button', { name: /click me/i });

    fireEvent.click(buttonElement);

    expect(buttonElement).toBeDisabled();
    expect(handleClick).not.toHaveBeenCalled();
  });
});

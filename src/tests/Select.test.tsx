import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Select from '../components/Select';

const options = [
  { label: '7 Days', value: 7 },
  { label: '30 Days', value: 30 },
];

describe('Select component', () => {

  it('renders all options', () => {
    render(<Select options={options} onChange={() => {}} />);
    options.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('calls onChange with selected value', () => {
    const mockOnChange = vi.fn();
    render(<Select options={options} onChange={mockOnChange} />);

    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: '30' } });

    expect(mockOnChange).toHaveBeenCalledWith('30');
  });
});

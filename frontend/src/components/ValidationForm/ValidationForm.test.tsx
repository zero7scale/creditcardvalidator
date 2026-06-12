import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ValidationForm } from './ValidationForm';
import * as validationApi from '../../services/validationApi';

vi.mock('../../services/validationApi');

describe('ValidationForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders input and validate button', () => {
    render(<ValidationForm />);

    expect(
      screen.getByPlaceholderText('Enter credit card number'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Validate Card' }),
    ).toBeInTheDocument();
  });

  it('updates input value when typing', async () => {
    const user = userEvent.setup();
    render(<ValidationForm />);

    const input = screen.getByPlaceholderText('Enter credit card number');
    await user.type(input, '4539148803436467');

    expect(input).toHaveValue('4539 1488 0343 6467');
  });

  it('calls API and shows valid result on submit', async () => {
    const user = userEvent.setup();
    vi.mocked(validationApi.validateCard).mockResolvedValue({ valid: true });

    render(<ValidationForm />);

    await user.type(
      screen.getByPlaceholderText('Enter credit card number'),
      '4539148803436467',
    );
    await user.click(screen.getByRole('button', { name: 'Validate Card' }));

    await waitFor(() => {
      expect(validationApi.validateCard).toHaveBeenCalledWith(
        '4539148803436467',
      );
    });

    expect(screen.getByRole('status')).toHaveTextContent(
      'Valid Credit Card Number',
    );
  });

  it('shows client-side error for empty submit', async () => {
    const user = userEvent.setup();
    render(<ValidationForm />);

    await user.click(screen.getByRole('button', { name: 'Validate Card' }));

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Please enter a credit card number.',
    );
    expect(validationApi.validateCard).not.toHaveBeenCalled();
  });
});

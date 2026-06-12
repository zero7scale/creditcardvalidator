import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ValidationResult } from './ValidationResult';

describe('ValidationResult', () => {
  it('shows loading message when validating', () => {
    render(<ValidationResult result={null} error={null} isLoading />);

    expect(screen.getByRole('status')).toHaveTextContent('Validating...');
  });

  it('shows valid message', () => {
    render(<ValidationResult result="valid" error={null} isLoading={false} />);

    expect(screen.getByRole('status')).toHaveTextContent(
      'Valid Credit Card Number',
    );
  });

  it('shows invalid message', () => {
    render(
      <ValidationResult result="invalid" error={null} isLoading={false} />,
    );

    expect(screen.getByRole('status')).toHaveTextContent(
      'Invalid Credit Card Number',
    );
  });

  it('shows error message', () => {
    render(
      <ValidationResult
        result={null}
        error="Please enter a credit card number."
        isLoading={false}
      />,
    );

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Please enter a credit card number.',
    );
  });
});

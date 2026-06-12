import { useCallback, useState } from 'react';
import { validateCard } from '../services/validationApi';
import type { ValidationResult } from '../types/validation.types';
import {
  formatCardNumber,
  stripCardNumberFormatting,
} from '../utils/cardNumberFormat';

interface UseCardValidationResult {
  cardNumber: string;
  setCardNumber: (value: string) => void;
  result: ValidationResult;
  error: string | null;
  isLoading: boolean;
  validate: () => Promise<void>;
}

export function useCardValidation(): UseCardValidationResult {
  const [cardNumber, setCardNumberState] = useState('');
  const [result, setResult] = useState<ValidationResult>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const setCardNumber = useCallback((value: string) => {
    setCardNumberState(formatCardNumber(value));
    setResult(null);
    setError(null);
  }, []);

  const validate = useCallback(async () => {
    const trimmed = stripCardNumberFormatting(cardNumber);

    if (!trimmed) {
      setError('Please enter a credit card number.');
      setResult(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await validateCard(trimmed);
      setResult(response.valid ? 'valid' : 'invalid');
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to validate. Please try again.';
      setError(message);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }, [cardNumber]);

  return {
    cardNumber,
    setCardNumber,
    result,
    error,
    isLoading,
    validate,
  };
}

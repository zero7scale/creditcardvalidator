import { AppError } from '../types/error.types.js';

const MIN_CARD_LENGTH = 13;
const MAX_CARD_LENGTH = 19;

export function normalizeCardNumber(raw: string): string {
  return raw.trim().replace(/[\s-]/g, '');
}

export function validateCardNumberInput(raw: unknown): string {
  if (typeof raw !== 'string') {
    throw new AppError(
      'cardNumber must be a string',
      400,
      'VALIDATION_ERROR',
    );
  }

  const normalized = normalizeCardNumber(raw);

  if (normalized.length === 0) {
    throw new AppError(
      'cardNumber is required',
      400,
      'VALIDATION_ERROR',
    );
  }

  if (!/^\d+$/.test(normalized)) {
    throw new AppError(
      'cardNumber must contain only digits (spaces and dashes allowed)',
      400,
      'VALIDATION_ERROR',
    );
  }

  if (
    normalized.length < MIN_CARD_LENGTH ||
    normalized.length > MAX_CARD_LENGTH
  ) {
    throw new AppError(
      `cardNumber must be between ${MIN_CARD_LENGTH} and ${MAX_CARD_LENGTH} digits`,
      400,
      'VALIDATION_ERROR',
    );
  }

  return normalized;
}

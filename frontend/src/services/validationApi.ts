import type {
  ApiErrorBody,
  ValidateCardRequest,
  ValidateCardResponse,
} from '../types/validation.types';

const VALIDATE_ENDPOINT = '/api/validate';

export class ValidationApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ValidationApiError';
    this.status = status;
  }
}

export async function validateCard(
  cardNumber: string,
): Promise<ValidateCardResponse> {
  const body: ValidateCardRequest = { cardNumber };

  const response = await fetch(VALIDATE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let message = 'Unable to validate. Please try again.';

    try {
      const errorBody = (await response.json()) as ApiErrorBody;
      if (errorBody.error?.message) {
        message = errorBody.error.message;
      }
    } catch {
      // Use default message when error body is not JSON.
    }

    throw new ValidationApiError(message, response.status);
  }

  return (await response.json()) as ValidateCardResponse;
}

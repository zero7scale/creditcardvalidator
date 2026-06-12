export interface ValidateCardRequest {
  cardNumber: string;
}

export interface ValidateCardResponse {
  valid: boolean;
}

export interface ApiErrorBody {
  error: {
    message: string;
    code: string;
  };
}

export type ValidationResult = 'valid' | 'invalid' | null;

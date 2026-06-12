export type ErrorCode = 'VALIDATION_ERROR' | 'INTERNAL_ERROR' | 'NOT_FOUND';

export interface ApiErrorBody {
  error: {
    message: string;
    code: ErrorCode;
  };
}

export class AppError extends Error {
  readonly statusCode: number;
  readonly code: ErrorCode;

  constructor(message: string, statusCode: number, code: ErrorCode) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

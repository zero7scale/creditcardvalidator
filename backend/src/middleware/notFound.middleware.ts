import type { Request, Response } from 'express';
import type { ApiErrorBody } from '../types/error.types.js';

export function notFoundMiddleware(
  _req: Request,
  res: Response<ApiErrorBody>,
): void {
  res.status(404).json({
    error: {
      message: 'Route not found',
      code: 'NOT_FOUND',
    },
  });
}

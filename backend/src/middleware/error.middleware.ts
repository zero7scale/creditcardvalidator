import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/error.types.js';
import type { ApiErrorBody } from '../types/error.types.js';
import { env } from '../config/env.js';

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response<ApiErrorBody>,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: {
        message: err.message,
        code: err.code,
      },
    });
    return;
  }

  if (env.nodeEnv === 'development') {
    console.error(err);
  }

  res.status(500).json({
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_ERROR',
    },
  });
}

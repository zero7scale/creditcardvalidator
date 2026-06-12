import type { Request, Response, NextFunction } from 'express';
import { isValidLuhn } from '../services/luhn.service.js';
import { validateCardNumberInput } from '../validators/cardNumber.validator.js';
import type { ValidateCardResponse } from '../types/validation.types.js';

export function validateCard(
  req: Request,
  res: Response<ValidateCardResponse>,
  next: NextFunction,
): void {
  try {
    const normalized = validateCardNumberInput(req.body?.cardNumber);
    const valid = isValidLuhn(normalized);
    res.status(200).json({ valid });
  } catch (error) {
    next(error);
  }
}

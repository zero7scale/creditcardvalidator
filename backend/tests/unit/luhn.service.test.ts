import { describe, it, expect } from 'vitest';
import { isValidLuhn } from '../../src/services/luhn.service.js';

describe('isValidLuhn', () => {
  it('returns true for a valid card number', () => {
    expect(isValidLuhn('4539148803436467')).toBe(true);
    expect(isValidLuhn('4111111111111111')).toBe(true);
  });

  it('returns false for an invalid checksum', () => {
    expect(isValidLuhn('4539148803436468')).toBe(false);
    expect(isValidLuhn('4111111111111112')).toBe(false);
  });

  it('returns false for all-zero number', () => {
    expect(isValidLuhn('0000000000000000')).toBe(false);
  });

  it('handles 13-digit valid Visa number', () => {
    expect(isValidLuhn('4222222222222')).toBe(true);
  });

  it('handles 16-digit common card number', () => {
    expect(isValidLuhn('5500000000000004')).toBe(true);
  });
});

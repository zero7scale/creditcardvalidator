import { describe, it, expect } from 'vitest';
import { formatCardNumber, stripCardNumberFormatting } from './cardNumberFormat';

describe('cardNumberFormat', () => {
  it('formats digits with a space every 4 characters', () => {
    expect(formatCardNumber('12212312131221312')).toBe('1221 2312 1312 2131 2');
    expect(formatCardNumber('4539148803436467')).toBe('4539 1488 0343 6467');
  });

  it('strips non-digit characters before formatting', () => {
    expect(formatCardNumber('4539-1488 0343 6467')).toBe('4539 1488 0343 6467');
  });

  it('limits input to 19 digits', () => {
    expect(formatCardNumber('12345678901234567890')).toBe('1234 5678 9012 3456 789');
  });

  it('strips formatting for API submission', () => {
    expect(stripCardNumberFormatting('4539 1488 0343 6467')).toBe(
      '4539148803436467',
    );
  });
});

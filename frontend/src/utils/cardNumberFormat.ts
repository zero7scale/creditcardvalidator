const MAX_CARD_DIGITS = 19;

export function stripCardNumberFormatting(value: string): string {
  return value.replace(/\D/g, '');
}

export function formatCardNumber(value: string): string {
  const digits = stripCardNumberFormatting(value).slice(0, MAX_CARD_DIGITS);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
}

import styles from './ValidationResult.module.css';
import type { ValidationResult as ValidationResultType } from '../../types/validation.types';

interface ValidationResultProps {
  result: ValidationResultType;
  error: string | null;
  isLoading: boolean;
}

export function ValidationResult({
  result,
  error,
  isLoading,
}: ValidationResultProps) {
  if (isLoading) {
    return (
      <p
        className={`${styles.message} ${styles.loading}`}
        role="status"
        aria-live="polite"
      >
        Validating...
      </p>
    );
  }

  if (error) {
    return (
      <p
        className={`${styles.message} ${styles.error}`}
        role="alert"
        aria-live="polite"
      >
        {error}
      </p>
    );
  }

  if (result === 'valid') {
    return (
      <p
        className={`${styles.message} ${styles.success}`}
        role="status"
        aria-live="polite"
      >
        Valid Credit Card Number
      </p>
    );
  }

  if (result === 'invalid') {
    return (
      <p
        className={`${styles.message} ${styles.invalid}`}
        role="status"
        aria-live="polite"
      >
        Invalid Credit Card Number
      </p>
    );
  }

  return null;
}

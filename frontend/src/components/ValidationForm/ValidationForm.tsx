import { type FormEvent } from 'react';
import { useCardValidation } from '../../hooks/useCardValidation';
import { ValidationResult } from '../ValidationResult/ValidationResult';
import styles from './ValidationForm.module.css';

export function ValidationForm() {
  const { cardNumber, setCardNumber, result, error, isLoading, validate } =
    useCardValidation();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void validate();
  };

  return (
    <section className={styles.card} aria-labelledby="validation-title">
      <header className={styles.header}>
        <h1 id="validation-title" className={styles.title}>
          Credit Card Validator
        </h1>
      </header>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <input
            id="card-number"
            name="cardNumber"
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            aria-label="Credit card number"
            className={styles.input}
            placeholder="Enter credit card number"
            value={cardNumber}
            onChange={(event) => setCardNumber(event.target.value)}
            disabled={isLoading}
            aria-describedby="validation-result"
          />
        </div>

        <button
          type="submit"
          className={styles.button}
          disabled={isLoading}
        >
          Validate Card
        </button>

        <div id="validation-result">
          <ValidationResult
            result={result}
            error={error}
            isLoading={isLoading}
          />
        </div>
      </form>
    </section>
  );
}

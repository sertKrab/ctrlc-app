import { useState, useCallback } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

type FormErrors<T> = Partial<Record<keyof T, string>>;

export interface UseFormReturn<T> {
  values: T;
  errors: FormErrors<T>;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setErrors: (errors: FormErrors<T>) => void;
  reset: () => void;
}

export function useForm<T extends Record<string, unknown>>(
  initialValues: T,
  onSubmit: (values: T) => void | Promise<void>,
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      void onSubmit(values);
    },
    [values, onSubmit],
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return { values, errors, handleChange, handleSubmit, setErrors, reset };
}

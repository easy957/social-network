export type ValidatorType = (value: string) => string | undefined;

export const required: ValidatorType = (value) =>
  value ? undefined : "Required field";

export const maxLength =
  (max: number): ValidatorType =>
  (value) =>
    value && value.length > max
      ? `Length must be less than ${max} symbols`
      : undefined;

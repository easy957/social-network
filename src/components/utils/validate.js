export const required = (value) => (value ? undefined : "Required field");

export const maxLength = (max) => (value) =>
  value && value.length > max
    ? `Length must be less than ${max} symbols`
    : undefined;

export const NAME_REGEX = /^[\p{L}\s]*$/u;

export const PHONE_REGEX = /^[0-9]*$/;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const NAME_FILTER_REGEX = /[^a-zA-ZÀ-ỹ\s]/g;

export const PHONE_FILTER_REGEX = /[^0-9]/g;

export const MIN_PHONE_LENGTH = 9;

export const MIN_PASSWORD_LENGTH = 6;

export const validateName = (value: string): boolean => {
  const trimmed = value.trim();

  return trimmed.length > 0 && NAME_REGEX.test(trimmed);
};

export const validatePhone = (value: string): boolean => {
  const trimmed = value.trim();

  return PHONE_REGEX.test(trimmed) && trimmed.length >= MIN_PHONE_LENGTH;
};

export const validateEmail = (value: string): boolean => {
  const trimmed = value.trim();

  return trimmed.length > 0 && EMAIL_REGEX.test(trimmed);
};

export const validatePassword = (value: string, minLength?: number): boolean => {
  const min = minLength || MIN_PASSWORD_LENGTH;

  return value.length >= min;
};

export const validateByType = (type: string, value: string, minLength?: number): boolean => {
  if (type === 'text') return validateName(value);

  if (type === 'tel') return validatePhone(value);

  if (type === 'email') return validateEmail(value);

  if (type === 'password') return validatePassword(value, minLength);

  return value.trim().length > 0;
};

export const filterName = (value: string): string => {
  return value.replace(NAME_FILTER_REGEX, '');
};

export const filterPhone = (value: string): string => {
  return value.replace(PHONE_FILTER_REGEX, '');
};

export const filterByType = (type: string, value: string): string => {
  if (type === 'text') return filterName(value);

  if (type === 'tel') return filterPhone(value);

  return value;
};


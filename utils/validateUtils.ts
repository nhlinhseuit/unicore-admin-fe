export const validateName = (firstName: string, lastName: string) => {
  return firstName.trim() === "" && lastName.trim() === ""
    ? "First name and last name cannot both be empty."
    : null;
};

export const validateEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? null : "Invalid email format.";
};

export const validatePassword = (value: string) => {
  return value.length >= 6
    ? null
    : "Password must be at least 6 characters long.";
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
) => {
  return password === confirmPassword
    ? null
    : "Confirm password is not correct.";
};

export const validatePhoneNumber = (value: string): string | null => {
  const phoneRegex = /^[0-9]{9,11}$/;

  if (!value) {
    return "Phone number is required.";
  }

  if (!phoneRegex.test(value)) {
    return "Invalid phone number.";
  }

  return null;
};

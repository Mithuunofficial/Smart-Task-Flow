export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePassword(password: string): boolean {
  // At least 6 characters
  return password.length >= 6;
}

export function validateTaskTitle(title: string): boolean {
  return title.trim().length >= 3;
}

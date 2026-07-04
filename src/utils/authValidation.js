export function validateSignIn(form) {
  const errors = {};

  if (!form.email.trim()) {
    errors.email = "Email is required.";
  }

  if (!form.password.trim()) {
    errors.password = "Password is required.";
  }

  return errors;
}

export function validateSignUp(form) {
  const errors = {};

  if (form.fullName.trim().length < 2) {
    errors.fullName = "Please enter a valid name.";
  }

  if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (!form.grade || Number(form.grade) < 6 || Number(form.grade) > 13) {
    errors.grade = "Grade must be between 6 and 13.";
  }

  return errors;
}
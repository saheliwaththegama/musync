export function validateRegistration(form) {
  const errors = {};

  if (form.fullName.trim().length < 2) {
    errors.fullName = "Please enter a valid name.";
  }

  if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) {
    errors.phone = "Please enter a valid 10-digit phone number.";
  }

  if (!form.grade || Number(form.grade) < 6 || Number(form.grade) > 13) {
    errors.grade = "Grade must be between 6 and 13.";
  }

  if (!form.eventId) {
    errors.eventId = "Please select an event.";
  }

  return errors;
}
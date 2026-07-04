// Generates a short ticket number that is easy to read.
export function generateTicketId() {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `REG-${random}`;
}
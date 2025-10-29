/**
 * Date formatting utilities to prevent hydration mismatches
 * Uses consistent formatting that works the same on server and client
 */

/**
 * Format a date to "Mon DD, YYYY, HH:MM" format
 * This format is timezone-consistent and prevents hydration errors
 * Uses UTC to ensure server and client render the same value
 */
export function formatDateTime(dateField: any): string {
  if (!dateField) return 'N/A';

  try {
    let date: Date;
    
    if (dateField._seconds) {
      // Firestore Timestamp
      date = new Date(dateField._seconds * 1000);
    } else if (typeof dateField === 'string') {
      date = new Date(dateField);
    } else if (dateField instanceof Date) {
      date = dateField;
    } else {
      return 'Invalid Date';
    }

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    
    return `${month} ${day}, ${year}, ${hours}:${minutes} UTC`;
  } catch (error) {
    return 'N/A';
  }
}

/**
 * Format a date to "Mon DD" format (short date)
 * Uses UTC to ensure server and client render the same value
 */
export function formatShortDate(dateField: any): string {
  if (!dateField) return 'N/A';

  try {
    let date: Date;
    
    if (dateField._seconds) {
      date = new Date(dateField._seconds * 1000);
    } else if (typeof dateField === 'string') {
      date = new Date(dateField);
    } else if (dateField instanceof Date) {
      date = dateField;
    } else {
      return 'Invalid Date';
    }

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();
    
    return `${month} ${day}`;
  } catch (error) {
    return 'N/A';
  }
}

/**
 * Format a date to "Mon YYYY" format
 * Uses UTC to ensure server and client render the same value
 */
export function formatMonthYear(dateField: any): string {
  if (!dateField) return 'N/A';

  try {
    let date: Date;
    
    if (dateField._seconds) {
      date = new Date(dateField._seconds * 1000);
    } else if (typeof dateField === 'string') {
      date = new Date(dateField);
    } else if (dateField instanceof Date) {
      date = dateField;
    } else {
      return 'Invalid Date';
    }

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    
    return `${month} ${year}`;
  } catch (error) {
    return 'N/A';
  }
}

/**
 * Get current date/time string in consistent format
 * Uses UTC to ensure server and client render the same value
 */
export function getCurrentDateTime(): string {
  const now = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[now.getUTCMonth()];
  const day = now.getUTCDate();
  const year = now.getUTCFullYear();
  const hours = now.getUTCHours().toString().padStart(2, '0');
  const minutes = now.getUTCMinutes().toString().padStart(2, '0');
  const seconds = now.getUTCSeconds().toString().padStart(2, '0');
  
  return `${month} ${day}, ${year}, ${hours}:${minutes}:${seconds} UTC`;
}

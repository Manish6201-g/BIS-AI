/**
 * Standard utility to conditionally join classNames (shadcn cn pattern).
 * Clean, lightweight, and dependency-free.
 */
export function cn(...inputs) {
  const classes = [];

  function process(input) {
    if (!input) return;
    if (typeof input === "string" || typeof input === "number") {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      input.forEach(process);
    } else if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }

  inputs.forEach(process);
  return classes.join(" ").trim();
}

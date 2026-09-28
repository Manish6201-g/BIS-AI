export type ClassValue = 
  | ClassValue[] 
  | Record<string, boolean | undefined | null> 
  | string 
  | number 
  | null 
  | boolean 
  | undefined;

/**
 * Standard utility to conditionally join classNames (shadcn cn pattern).
 * Clean, lightweight, and dependency-free.
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  function process(input: ClassValue) {
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

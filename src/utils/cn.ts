import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const INTERNAL_PREFIX = "ordu:";

function removeInternalPrefix(className: string): string {
  return className.startsWith(INTERNAL_PREFIX) ? className.slice(INTERNAL_PREFIX.length) : className;
}

export function cn(...inputs: ClassValue[]): string {
  const classNames = clsx(inputs);
  if (!classNames) return "";

  const original = classNames.split(/\s+/);
  const originalsByNormalized = new Map<string, string[]>();
  const normalized = original.map((className) => {
    const normalizedClassName = removeInternalPrefix(className);
    const candidates = originalsByNormalized.get(normalizedClassName);
    if (candidates) {
      candidates.push(className);
    } else {
      originalsByNormalized.set(normalizedClassName, [className]);
    }
    return normalizedClassName;
  });

  return twMerge(normalized.join(" "))
    .split(/\s+/)
    .map((className) => originalsByNormalized.get(className)?.pop() ?? className)
    .join(" ");
}

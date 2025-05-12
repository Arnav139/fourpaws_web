import { clsx, type ClassValue } from "clsx";
import { formatDistance } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date to relative time (e.g., "2 days ago")
export function formatRelativeTime(dateString: string): string {
  return formatDistance(new Date(dateString), new Date(), { addSuffix: true });
}

// Format number with abbreviations for large values (e.g., 1.2k)
export function formatNumber(num: number): string {
  if (num < 1000) return num.toString();
  if (num < 1000000) return (num / 1000).toFixed(1) + "k";
  return (num / 1000000).toFixed(1) + "M";
}

// Format currency with correct symbol and decimal places
export function formatCurrency(
  amount: number,
  currency: string = "USD",
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

// Format percentage with correct symbol
export function formatPercentage(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 1,
  }).format(value / 100);
}

// Truncate text to a specific length and add ellipsis
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

// Get a color for a specific pet species
export function getPetSpeciesColor(species: string): string {
  const colorMap: Record<string, string> = {
    Dog: "text-amber-500",
    Cat: "text-indigo-500",
    Bird: "text-sky-500",
    Fish: "text-cyan-500",
    Reptile: "text-emerald-500",
    Rabbit: "text-rose-500",
  };

  return colorMap[species] || "text-gray-500";
}

export const calculateAgeFromDOB = (dob?: string): string => {
  if (!dob) return "0";

  const birthDate = new Date(dob);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  const months = today.getMonth() - birthDate.getMonth();

  // Adjust years if birth month hasn't occurred yet this year
  if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
    years--;
  }

  if (years > 0) {
    return `${years}`;
  } else {
    // Calculate months instead
    const monthAge = months + (months < 0 ? 12 : 0);
    return `${monthAge} months`;
  }
};

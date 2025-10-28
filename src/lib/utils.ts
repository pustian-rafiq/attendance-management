import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatTime(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDateTime(date: Date | string): string {
  return `${formatDate(date)} ${formatTime(date)}`;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function calculateAttendancePercentage(
  present: number,
  total: number
): number {
  if (total === 0) return 0;
  return Math.round((present / total) * 100);
}

export function getAttendanceStatus(percentage: number): {
  label: string;
  color: string;
} {
  if (percentage >= 90) return { label: "Excellent", color: "text-green-600" };
  if (percentage >= 75) return { label: "Good", color: "text-blue-600" };
  if (percentage >= 60) return { label: "Average", color: "text-yellow-600" };
  if (percentage >= 40) return { label: "Poor", color: "text-orange-600" };
  return { label: "Critical", color: "text-red-600" };
}

export function getCurrentSemester(): string {
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  // January to June: Spring Semester
  if (month >= 0 && month <= 5) {
    return `Spring ${year}`;
  }
  // July to December: Fall Semester
  return `Fall ${year}`;
}

export function getCurrentAcademicYear(): string {
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  // July to December: Current year - Next year
  if (month >= 6) {
    return `${year}-${year + 1}`;
  }
  // January to June: Previous year - Current year
  return `${year - 1}-${year}`;
}

export function generateStudentId(): string {
  const year = new Date().getFullYear().toString().slice(-2);
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `STU${year}${random}`;
}

export function exportToCSV(data: Record<string, unknown>[], filename: string) {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers.map((header) => JSON.stringify(row[header] ?? "")).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

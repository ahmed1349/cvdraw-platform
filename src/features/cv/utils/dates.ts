const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function parseFlexibleDate(value?: string) {
  if (!value) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    if (!year || !month || !day) return null;
    return new Date(year, month - 1, day);
  }
  if (/^\d{4}-\d{2}$/.test(value)) {
    const [year, month] = value.split("-").map(Number);
    if (!year || !month) return null;
    return new Date(year, month - 1, 1);
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

export function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatMonthYear(value?: string) {
  const date = parseFlexibleDate(value);
  if (!date) return value ?? "";
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatDisplayDate(value?: string) {
  const date = parseFlexibleDate(value);
  if (!date) return "";
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatDateRange(start?: string, end?: string, current?: boolean) {
  const startLabel = formatMonthYear(start);
  if (!startLabel) return "";
  if (current) return `${startLabel} — Present`;
  const endLabel = formatMonthYear(end);
  if (!endLabel) return startLabel;
  return `${startLabel} — ${endLabel}`;
}

export function formatUpdatedAt(value: string) {
  return formatDisplayDate(value) || value;
}

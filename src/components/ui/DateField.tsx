import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { formatDisplayDate, parseFlexibleDate, toIsoDate } from "@/features/cv/utils/dates";
import { cn } from "@/lib/cn";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface DateFieldProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function DateField({ label, value, onChange, disabled }: DateFieldProps) {
  const [open, setOpen] = useState(false);
  const selected = parseFlexibleDate(value);
  const [cursor, setCursor] = useState(() => selected ?? new Date());
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setCursor(parseFlexibleDate(value) ?? new Date());
  }, [open, value]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const days = useMemo(() => buildCalendar(cursor), [cursor]);
  const display = formatDisplayDate(value);

  return (
    <div ref={rootRef} className="relative block">
      <span className="mb-1.5 block text-sm font-medium text-ink-text">{label}</span>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-line bg-paper px-3 text-left text-sm",
          disabled && "cursor-not-allowed bg-canvas text-muted",
        )}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={display ? `${label}: ${display}` : label}
      >
        <span className={display ? "text-ink-text" : "text-muted"}>
          {display || "Select a date"}
        </span>
        <CalendarDays size={16} className="text-muted" />
      </button>

      {open && !disabled ? (
        <div
          role="dialog"
          aria-label={`${label} calendar`}
          className="absolute z-30 mt-1 w-[276px] rounded-xl border border-line bg-paper p-3 shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
        >
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              className="rounded-md p-1 text-muted hover:bg-canvas hover:text-ink-text"
              aria-label="Previous month"
              onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
            >
              <ChevronLeft size={16} />
            </button>
            <p className="text-sm font-medium text-ink-text">
              {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
            </p>
            <button
              type="button"
              className="rounded-md p-1 text-muted hover:bg-canvas hover:text-ink-text"
              aria-label="Next month"
              onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-muted">
            {WEEKDAYS.map((day) => (
              <span key={day} className="py-1">
                {day}
              </span>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              if (!day) return <span key={`empty-${index}`} />;
              const iso = toIsoDate(day);
              const isSelected = selected ? toIsoDate(selected) === iso : false;
              const isToday = toIsoDate(new Date()) === iso;
              return (
                <button
                  key={iso}
                  type="button"
                  onClick={() => {
                    onChange(iso);
                    setOpen(false);
                  }}
                  className={cn(
                    "h-8 rounded-md text-sm text-ink-text hover:bg-canvas",
                    isSelected && "bg-ink text-white hover:bg-ink",
                    !isSelected && isToday && "border border-line",
                  )}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
          <div className="mt-3 flex justify-between border-t border-line pt-2">
            <button
              type="button"
              className="text-xs text-muted hover:text-ink-text"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
            >
              Clear
            </button>
            <button
              type="button"
              className="text-xs text-ink-text"
              onClick={() => {
                onChange(toIsoDate(new Date()));
                setOpen(false);
              }}
            >
              Today
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function buildCalendar(cursor: Date) {
  const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const startPad = first.getDay();
  const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
  const cells: Array<Date | null> = [];
  for (let i = 0; i < startPad; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(cursor.getFullYear(), cursor.getMonth(), day));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

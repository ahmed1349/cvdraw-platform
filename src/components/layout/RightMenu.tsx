import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

export function RightMenu({
  open,
  onClose,
  labelledBy,
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy?: string;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 bg-[#17201c]/20"
        aria-label="Close menu"
        onClick={onClose}
      />
      <aside
        className="fixed inset-y-0 right-0 z-50 flex w-[min(272px,86vw)] flex-col border-l border-line bg-paper/90 px-3 py-3"
        aria-labelledby={labelledBy}
      >
        <button
          type="button"
          className="mb-2 ml-auto inline-flex size-9 items-center justify-center rounded-md text-ink-text"
          aria-label="Close menu"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        {children}
      </aside>
    </>
  );
}

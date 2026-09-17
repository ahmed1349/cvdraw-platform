import { Link } from "react-router-dom";
import { useCVStore } from "@/app/store/cvStore";
import { Button } from "@/components/ui/Button";

export function SettingsPage() {
  const count = useCVStore((state) => state.cvs.length);

  return (
    <main className="mx-auto max-w-[720px] px-5 py-12">
      <h1 className="text-2xl font-medium text-ink-text">Settings</h1>
      <section className="mt-8 rounded-xl border border-line bg-paper p-5">
        <h2 className="text-base font-medium text-ink-text">Account</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Authentication is not part of this first build. CVs stay in this browser through a storage
          layer that can later point at an API.
        </p>
        <Link to="/login" className="mt-4 inline-block text-sm text-ink underline">
          Open sign-in
        </Link>
      </section>
      <section className="mt-4 rounded-xl border border-line bg-paper p-5">
        <h2 className="text-base font-medium text-ink-text">Storage</h2>
        <p className="mt-2 text-sm text-muted">{count} CV{count === 1 ? "" : "s"} saved locally.</p>
        <Button
          variant="danger"
          className="mt-4"
          onClick={() => {
            localStorage.removeItem("grove.cvs.v1");
            window.location.reload();
          }}
        >
          Clear local CVs
        </Button>
      </section>
    </main>
  );
}

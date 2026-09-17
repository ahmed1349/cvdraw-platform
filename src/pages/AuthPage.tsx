import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export function AuthPage() {
  return (
    <main className="mx-auto max-w-[480px] px-5 py-16">
      <h1 className="text-2xl font-medium text-ink-text">Sign in</h1>
      <p className="mt-2 text-sm leading-6 text-muted">
        Google, GitHub, and email sign-in will plug into AuthService later. Continue as a guest for
        now.
      </p>
      <div className="mt-6 space-y-3">
        <Button className="w-full" disabled>
          Continue with Google
        </Button>
        <Button className="w-full" variant="secondary" disabled>
          Continue with GitHub
        </Button>
        <Button className="w-full" variant="secondary" disabled>
          Continue with email
        </Button>
        <Link
          to="/create"
          className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-mint px-3.5 text-sm font-medium text-ink"
        >
          Continue as guest
        </Link>
      </div>
    </main>
  );
}

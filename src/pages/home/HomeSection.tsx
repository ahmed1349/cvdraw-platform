import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

export function HomeSection({
  id,
  children,
  className,
  containerClassName,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-20 px-5 py-16 md:py-20 lg:py-24", className)}>
      <div className={cn("mx-auto max-w-[1200px]", containerClassName)}>{children}</div>
    </section>
  );
}

export function HomeHeading({ children }: { children: ReactNode }) {
  return <h2 className="text-3xl font-medium tracking-tight text-ink-text md:text-[40px]">{children}</h2>;
}

export function HomeLead({ children }: { children: ReactNode }) {
  return <p className="mt-3 max-w-2xl text-base leading-7 text-muted">{children}</p>;
}

export function PrimaryCta({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex h-10 items-center rounded-lg bg-ink px-4 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#0d2c21]"
    >
      {children}
    </Link>
  );
}

export function SecondaryCta({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex h-10 items-center rounded-lg border border-line bg-paper px-4 text-sm font-medium text-ink-text transition-colors duration-150 hover:bg-canvas"
    >
      {children}
    </Link>
  );
}

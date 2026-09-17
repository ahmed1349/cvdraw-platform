import logo from "@/assets/png/logo.png";
import { cn } from "@/lib/cn";

export function BrandLogo({ className }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="CVdraw"
      className={cn("h-8 w-auto", className)}
    />
  );
}

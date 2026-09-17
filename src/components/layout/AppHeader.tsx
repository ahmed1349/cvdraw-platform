import { useEffect, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { RightMenu } from "@/components/layout/RightMenu";
import { cn } from "@/lib/cn";

const links = [
  { to: "/templates", label: "Templates" },
  { to: "/cvs", label: "My CVs" },
  { to: "/settings", label: "Settings" },
];

export function AppHeader({ trailing }: { trailing?: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
    <header className="sticky top-0 z-30 border-b border-line bg-paper">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-3 px-5">
        <NavLink to="/" aria-label="CVdraw home" className="flex items-center">
          <BrandLogo />
        </NavLink>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "text-sm text-muted transition-colors duration-150 hover:text-ink-text",
                  isActive && "text-ink-text",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {trailing}
          <NavLink
            to="/create"
            className="inline-flex h-9 items-center rounded-lg bg-ink px-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#0d2c21]"
          >
            Create My CV
          </NavLink>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md text-ink-text md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>

      <RightMenu open={menuOpen} onClose={() => setMenuOpen(false)}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn(
                "rounded-md px-3 py-2.5 text-sm text-muted",
                isActive && "bg-mint/40 text-ink-text",
              )
            }
          >
            {link.label}
          </NavLink>
        ))}
      </RightMenu>
    </>
  );
}

export function AppFooter() {
  return (
    <footer className="no-print border-t border-line bg-paper">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-12 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
        <div>
          <BrandLogo className="h-9" />
          <p className="mt-3 max-w-xs text-sm leading-6 text-muted">
            ATS-focused CVs for technical and creative careers.
          </p>
        </div>
        <FooterColumn
          title="Product"
          items={[
            { to: "/templates", label: "Templates" },
            { to: "/create", label: "Create CV" },
            { to: "/cvs", label: "My CVs" },
            { to: "/#ats", label: "ATS Analysis" },
          ]}
        />
        <FooterColumn
          title="Resources"
          items={[
            { to: "/templates", label: "CV Guide" },
            { to: "/templates", label: "Career Tips" },
            { to: "/#ats", label: "ATS Guide" },
          ]}
        />
        <FooterColumn
          title="Company"
          items={[
            { to: "/", label: "About" },
            { to: "/settings", label: "Contact" },
            { to: "/settings", label: "Privacy" },
            { to: "/settings", label: "Terms" },
          ]}
        />
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: Array<{ to: string; label: string }>;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-ink-text">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={`${item.to}-${item.label}`}>
            <NavLink to={item.to} className="text-sm text-muted transition-colors duration-150 hover:text-ink-text">
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

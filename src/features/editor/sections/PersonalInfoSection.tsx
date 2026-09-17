import { Input } from "@/components/ui/Input";
import type { PersonalInfo } from "@/features/cv/types/cv.types";

interface PersonalInfoSectionProps {
  value: PersonalInfo;
  onChange: (patch: Partial<PersonalInfo>) => void;
}

export function PersonalInfoSection({ value, onChange }: PersonalInfoSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-medium text-ink-text">Personal Information</h2>
        <p className="mt-1 text-sm text-muted">
          ATS systems look for a name, title, email, and phone as plain text.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Full name"
          value={value.fullName}
          autoComplete="name"
          onChange={(event) => onChange({ fullName: event.target.value })}
        />
        <Input
          label="Professional title"
          value={value.professionalTitle}
          placeholder="Software Engineer"
          onChange={(event) => onChange({ professionalTitle: event.target.value })}
        />
        <Input
          label="Email"
          type="email"
          value={value.email}
          autoComplete="email"
          onChange={(event) => onChange({ email: event.target.value })}
        />
        <Input
          label="Phone"
          value={value.phone}
          autoComplete="tel"
          onChange={(event) => onChange({ phone: event.target.value })}
        />
        <Input
          label="Website"
          value={value.website ?? ""}
          onChange={(event) => onChange({ website: event.target.value })}
        />
        <Input
          label="LinkedIn"
          value={value.linkedin ?? ""}
          placeholder="linkedin.com/in/you"
          onChange={(event) => onChange({ linkedin: event.target.value })}
        />
        <Input
          label="GitHub"
          value={value.github ?? ""}
          placeholder="github.com/you"
          onChange={(event) => onChange({ github: event.target.value })}
        />
        <Input
          label="Portfolio"
          value={value.portfolio ?? ""}
          onChange={(event) => onChange({ portfolio: event.target.value })}
        />
      </div>
    </div>
  );
}

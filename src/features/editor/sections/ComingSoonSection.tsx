export function ComingSoonSection({ title }: { title: string }) {
  return (
    <div>
      <h2 className="text-lg font-medium text-ink-text">{title}</h2>
      <p className="mt-2 max-w-lg text-sm leading-6 text-muted">
        This section is in the CV data model and template renderer. The editor for it comes after
        Classic Engineer is validated. You can still hide or reorder it from the section list.
      </p>
    </div>
  );
}

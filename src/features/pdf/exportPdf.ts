export function openPrintView(cvId: string) {
  const url = `/print/${cvId}`;
  const printWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (!printWindow) {
    window.location.assign(url);
  }
}


export function StepHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="mb-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {subtitle && <p className="mt-1 text-neutral-400">{subtitle}</p>}
    </header>
  );
}

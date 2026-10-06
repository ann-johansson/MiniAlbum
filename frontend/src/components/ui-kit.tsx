import { useState, type ReactNode } from "react";
import { BookOpen, Leaf } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={(nextOpen) => { if (!nextOpen) onClose(); }}>
      <DialogContent aria-describedby={undefined} className="paper-surface max-h-[90dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-lg bg-card p-6 shadow-lift sm:p-8">
        <Leaf aria-hidden="true" className="mb-1 size-5 text-moss" />
        <DialogTitle className="font-display text-3xl font-medium">{title}</DialogTitle>
        <div className="mt-2">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

export function Field({
  label,
  value,
  onChange,
  textarea,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  placeholder?: string;
  required?: boolean;
}) {
  const cls =
    "mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">
        {label}
      </span>
      {textarea ? (
        <textarea rows={3} className={cls} value={value} required={required} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className={cls} value={value} required={required} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

export function Button({
  children,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" }) {
  const base =
    "inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50";
  const v =
    variant === "primary"
      ? "bg-primary text-primary-foreground shadow-soft hover:-translate-y-px hover:shadow-lift"
      : "text-muted-foreground hover:bg-secondary hover:text-foreground";
  return (
    <button {...props} className={`${base} ${v} ${props.className ?? ""}`}>
      {children}
    </button>
  );
}

export function StatusBox({ title, text, action }: { title: string; text?: string; action?: ReactNode }) {
  return (
    <div role="status" className="border-y border-border px-4 py-16 text-center sm:py-20">
      <BookOpen aria-hidden="true" className="mx-auto mb-5 size-8 stroke-1 text-moss" />
      <p className="font-display text-3xl text-foreground">{title}</p>
      {text && <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{text}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function SkeletonGrid({ count = 6, tall }: { count?: number; tall?: boolean }) {
  return (
    <div role="status" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <span className="sr-only">Gathering your {tall ? "photos" : "albums"}…</span>
      {Array.from({ length: count }).map((_, i) => (
        <div aria-hidden="true" key={i} className={`paper-surface animate-pulse rounded-md border border-border bg-card p-5 ${tall ? "h-96" : "h-64"}`}>
          <div className={`${tall ? "h-64" : "h-36"} rounded-sm bg-secondary`} />
          <div className="mt-5 h-3 w-2/3 bg-secondary" />
          <div className="mt-3 h-2 w-1/3 bg-secondary" />
        </div>
      ))}
    </div>
  );
}

/** Small hook for form submission state. */
export function useSubmit() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    setError(null);
    try {
      await fn();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };
  return { busy, error, run };
}

/** Stable, token-based print colors from the title or file name. */
export function printPalette(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 997;
  return ["print-amber", "print-moss", "print-rowan", "print-rust"][h % 4];
}

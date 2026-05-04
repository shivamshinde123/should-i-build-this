import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl border border-border bg-surface p-8">
        <p className="font-mono text-[11px] tracking-[0.32em] text-accent">REPORT NOT FOUND</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">
          That shared analysis link is invalid or no longer available.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-ink-muted">
          Double-check the copied URL from the mobile app. The viewer expects an 8-character report
          slug under <span className="font-mono text-accent">/r/&lt;slug&gt;</span>.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center border border-accent px-4 py-3 font-mono text-[11px] tracking-[0.24em] text-accent transition hover:bg-accent/8"
        >
          BACK TO VIEWER HOME
        </Link>
      </div>
    </main>
  );
}

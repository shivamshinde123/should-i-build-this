export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl border border-border bg-surface/90 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur">
        <div className="flex items-center gap-4 border-b border-hairline pb-5">
          <div className="grid h-10 w-10 place-items-center border border-accent bg-accent text-background">
            &gt;_
          </div>
          <div>
            <p className="font-mono text-[11px] tracking-[0.32em] text-accent">
              SHOULD I BUILD THIS?
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
              Shared report viewer
            </h1>
          </div>
        </div>

        <div className="mt-8 space-y-5 text-sm leading-7 text-ink-muted">
          <p>
            Open a public share link in the format{" "}
            <span className="font-mono text-accent">/r/abcd1234</span> to view a live Builder +
            Investor analysis report.
          </p>
          <p>
            This viewer is read-only and server-rendered. The mobile app remains the place where
            new analyses are generated and shared.
          </p>
        </div>
      </div>
    </main>
  );
}

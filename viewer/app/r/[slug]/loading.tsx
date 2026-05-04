export default function Loading() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl animate-pulse space-y-6">
        <div className="h-24 border border-border bg-surface" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-36 border border-border bg-surface" />
          ))}
        </div>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-48 border border-border bg-surface" />
          ))}
        </div>
      </div>
    </main>
  );
}

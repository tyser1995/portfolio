export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-6 md:p-12">
      {/* Header skeleton */}
      <div className="flex flex-col items-center gap-3 w-full">
        <div className="skeleton w-20 h-20 rounded-full" />
        <div className="skeleton w-64 h-10 rounded-lg" />
        <div className="skeleton w-28 h-6 rounded-full" />
        <div className="skeleton w-48 h-6 rounded-lg" />
      </div>
      {/* Nav skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-5xl px-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton h-20 rounded-xl" />
        ))}
      </div>
      {/* Cards skeleton */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-40 rounded-xl" />
        ))}
      </div>
    </main>
  );
}

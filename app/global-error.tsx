"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen items-center justify-center px-4">
          <div className="flex max-w-md flex-col items-center text-center">
            <h2 className="text-3xl font-bold">Something went wrong!</h2>

            <p className="mt-3 text-sm text-zinc-500">
              {error?.message || "A critical application error occurred."}
            </p>

            <button
              type="button"
              onClick={() => reset()}
              className="mt-6 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-medium text-white"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}

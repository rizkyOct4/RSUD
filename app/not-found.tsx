import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-zinc-100">
      <section className="flex w-full max-w-lg flex-col items-center text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10">
          <span className="text-2xl font-semibold text-emerald-400">
            404
          </span>
        </div>

        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-emerald-400">
          Page not found
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          This page could not be found.
        </h1>

        <p className="mt-4 max-w-md text-sm leading-6 text-zinc-400">
          The page you are looking for may have been moved, deleted, or
          the URL might be incorrect.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-xl bg-emerald-500 px-6 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-zinc-950"
        >
          Back to home
        </Link>
      </section>
    </main>
  );
};

export default NotFound;


"use client";

import { useRouter, useSearchParams } from "next/navigation";

type TransactionErrorProps = {
  error: unknown;
};

export default function Error({ error }: TransactionErrorProps) {
  // console.log(error)
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleBack = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Hapus value pencarian
    params.delete("v");

    const query = params.toString();

    router.replace(query ? `/transaction?${query}` : "/transaction");
  };

  return (
    <main className="flex min-h-[400px] w-full items-center justify-center px-4">
      <div className="flex max-w-md flex-col items-center text-center">
        <h1 className="text-4xl font-bold">Something Went Wrong!</h1>

        <button
          type="button"
          onClick={handleBack}
          className="mt-6 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Fix it
        </button>
      </div>
    </main>
  );
}

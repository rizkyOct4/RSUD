"use client";

import { Suspense } from "react";
import Image from "next/image";

export const SuspenseLoading = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950/95">
          <div className="flex flex-col items-center">
            {/* Logo */}
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/40">
              <div className="absolute inset-0 rounded-2xl bg-emerald-400/5" />

              <div className="relative h-10 w-10">
                <Image
                  src="/logo2.png"
                  alt="Monie Logo"
                  sizes="40px"
                  priority
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Brand */}
            <div className="mt-5 flex flex-col items-center">
              <p className="text-sm font-semibold tracking-tight text-zinc-200">
                Monie
              </p>

              <div className="mt-2 flex items-center gap-1.5">
                <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
                <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400 [animation-delay:150ms]" />
                <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400 [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

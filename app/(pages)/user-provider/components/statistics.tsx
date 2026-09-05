"use client";

import { UserCarProviderContext } from "@/app/context/context";
import { useContext } from "react";

const Statistics = () => {
  const { StatisticsData } = useContext(UserCarProviderContext);

  return (
    <section className="mb-8 flex flex-wrap gap-4">
      <div className="min-w-50 flex-1 rounded-xl border border-zinc-200 bg-white p-5">
        <p className="text-sm text-zinc-500">Total Mobil</p>

        <p className="mt-2 text-2xl font-semibold text-zinc-900">
          {StatisticsData[0]?.amountCar}
        </p>
      </div>

      <div className="min-w-50 flex-1 rounded-xl border border-zinc-200 bg-white p-5">
        <p className="text-sm text-zinc-500">Tersedia</p>

        <p className="mt-2 text-2xl font-semibold text-zinc-900">
          {StatisticsData[0]?.amountCarActive}
        </p>
      </div>

      <div className="min-w-50 flex-1 rounded-xl border border-zinc-200 bg-white p-5">
        <p className="text-sm text-zinc-500">Sedang Disewa</p>

        <p className="mt-2 text-2xl font-semibold text-zinc-900">
          {StatisticsData[0]?.amountCarRented}
        </p>
      </div>

      <div className="min-w-50 flex-1 rounded-xl border border-zinc-200 bg-white p-5">
        <p className="text-sm text-zinc-500">Konfirmasi Pengembalian</p>

        <p className="mt-2 text-2xl font-semibold text-zinc-900">
          {StatisticsData[0]?.amountCarReturned}
        </p>
      </div>
    </section>
  );
};

export default Statistics;

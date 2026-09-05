"use client";

import { memo, useContext } from "react";
import { DashboardContext } from "@/app/context/context";

const SearchDashboard = () => {
  const { carFilter, setCarFilter } = useContext(DashboardContext);

  return (
    <section className="mb-10 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-5 md:flex-row md:items-end">
        {/* Start Date */}
        {/* <div className="w-full space-y-2 md:flex-1">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-zinc-700"
          >
            Tanggal Mulai
          </label>

          <input
            id="startDate"
            type="date"
            className="h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-900"
          />
        </div> */}
        <div className="space-y-2">
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-zinc-700"
          >
            Merek
          </label>

          <select
            value={carFilter.brand}
            onChange={(e) =>
              setCarFilter({
                brand: e.target.value,
              })
            }
            className="h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-zinc-900"
          >
            <option value="">Semua Merek</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Mitsubishi">Mitsubishi</option>
            <option value="Daihatsu">Daihatsu</option>
            <option value="Suzuki">Suzuki</option>
          </select>
        </div>

        {/* End Date */}
        {/* <div className="w-full space-y-2 md:flex-1">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-zinc-700"
          >
            Tanggal Selesai
          </label>

          <input
            id="endDate"
            type="date"
            className="h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-900"
          />
        </div> */}

        {/* Search Button */}
        <button
          type="button"
          className="h-11 w-full rounded-lg bg-zinc-900 px-6 text-sm font-medium text-white transition-opacity hover:opacity-90 md:w-auto"
        >
          Cari Mobil
        </button>
      </div>
    </section>
  );
};

export default memo(SearchDashboard);

"use client";

import { memo } from "react";

const SearchDashboard = () => {
  return (
    <section className="mb-10 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-5 md:flex-row md:items-end">
        {/* Start Date */}
        <div className="w-full space-y-2 md:flex-1">
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
        </div>

        {/* End Date */}
        <div className="w-full space-y-2 md:flex-1">
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
        </div>

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

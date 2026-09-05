"use client";

import { UserCarProviderContext } from "@/app/context/context";
import { useContext } from "react";

const SearchAndFilter = () => {
  const { carFilter, setCarFilter } = useContext(UserCarProviderContext);

  return (
    <section className="mb-6 rounded-xl border border-zinc-200 bg-white p-5">
      <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
        <div className="space-y-2">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-zinc-700"
          >
            Cari Mobil
          </label>

          <input
            id="search"
            type="text"
            placeholder="Merek, model, atau nomor plat"
            className="h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-900"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-zinc-700"
          >
            Merek
          </label>

          <select
            // id="brand"
            value={carFilter.brand}
            onChange={(e) =>
              setCarFilter({
                brand: e.target.value,
                model: "",
              })
            }
            className="h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-zinc-900"
            defaultValue=""
          >
            <option value="">Semua Merek</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Mitsubishi">Mitsubishi</option>
            <option value="Daihatsu">Daihatsu</option>
            <option value="Suzuki">Suzuki</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-zinc-700"
          >
            Ketersediaan
          </label>

          <select
            id="status"
            className="h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-zinc-900"
            defaultValue=""
          >
            <option value="">Semua</option>
            <option value="available">Tersedia</option>
            <option value="rented">Sedang Disewa</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default SearchAndFilter;

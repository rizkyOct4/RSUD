"use client";

import { memo, useContext } from "react";
import { DashboardContext } from "@/app/context/context";

const HeaderDashboard = () => {
  const { carFilter, setCarFilter } = useContext(DashboardContext);
  return (
    <section className="mb-8">
      <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">
        Sewa Mobil
      </h2>

      <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
        Pilih tanggal penyewaan untuk melihat mobil yang tersedia.
      </p>

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
    </section>
  );
};

export default memo(HeaderDashboard);

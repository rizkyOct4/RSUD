"use client";

import { UserCarProviderContext } from "@/app/context/context";
import { useContext } from "react";

const CarList = () => {
  const { CarListData, carFilter, CarFilterBrandData } =
    useContext(UserCarProviderContext);

  const dataUsed = carFilter.brand === "" ? CarListData : CarFilterBrandData;

  return (
    <section className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
      <div className="border-b border-zinc-200 px-5 py-4">
        <h3 className="font-semibold text-zinc-900">Daftar Mobil</h3>

        <p className="mt-1 text-sm text-zinc-500">
          Semua mobil yang terdaftar dalam sistem.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-200 text-left">
          <thead className="border-b border-zinc-200 bg-zinc-50">
            <tr>
              <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
                Mobil
              </th>

              <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
                Nomor Plat
              </th>

              <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
                Tarif / Hari
              </th>

              <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
                Status
              </th>

              <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wide text-zinc-500">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-100">
            {Array.isArray(dataUsed) &&
              dataUsed.length > 0 &&
              dataUsed.map((car) => (
                <tr
                  key={car.pbId}
                  className="transition-colors hover:bg-zinc-50"
                >
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium text-zinc-900">
                        {car.brand} {car.model}
                      </p>

                      <p className="mt-1 text-xs text-zinc-400">{car.pbId}</p>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-zinc-600">
                    {car.plateNumber}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-zinc-900">
                    Rp{car.dailyRate.toLocaleString("id-ID")}
                  </td>

                  <td className="px-5 py-4">
                    {car.status === "ACTIVE" && (
                      <span className="inline-flex rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                        Tersedia
                      </span>
                    )}
                    {car.status === "RENTED" && (
                      <span className="inline-flex rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                        Sedang Disewa
                      </span>
                    )}
                    {car.status === "RETURNED" && (
                      <span className="inline-flex rounded-full bg-red-400 px-3 py-1 text-xs font-medium text-zinc-700">
                        Konfirmasi Pengembalian
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        className="rounded-lg border border-zinc-300 px-3 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="rounded-lg border border-zinc-300 px-3 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
                      >
                        Detail
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CarList;

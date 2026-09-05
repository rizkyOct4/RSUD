"use client";

import { UserCarProviderContext } from "@/app/context/context";
import { useContext, useState, useCallback } from "react";
import { ToastPromise } from "@/_util/toast";
import { Spokes } from "@/components/ui/spokes";

const CarList = () => {
  const { CarListData, carFilter, CarFilterBrandData, putConfirmCarReturn } =
    useContext(UserCarProviderContext);

  const [isConfirmReturn, setIsConfirmReturn] = useState({
    isOpen: false,
    pbId: "",
    status: "",
  });

  const [isSubmit, setIsSubmit] = useState(false);

  const dataUsed = carFilter.brand === "" ? CarListData : CarFilterBrandData;

  const handleAction = useCallback(
    async (actionType: string, pbId: string, status: string) => {
      switch (actionType) {
        case "popupConfirmReturn": {
          setIsConfirmReturn((prev) => ({
            isOpen: prev.isOpen === true ? false : true,
            pbId: prev.pbId === pbId ? "" : pbId,
            status: prev.status === status ? "" : status,
          }));
          break;
        }
        case "back": {
          setIsConfirmReturn({
            isOpen: false,
            pbId: "",
            status: "",
          });
          break;
        }
        case "confirm": {
          try {
            setIsSubmit(true);
            const put = {
              pbId: pbId,
              status: status,
              confirmReturnDate: new Date(),
            };

            const res = putConfirmCarReturn(put);
            ToastPromise(res);
            await res;

            // console.log(put);
            setIsSubmit(false);
            setIsConfirmReturn({
              isOpen: false,
              pbId: "",
              status: "",
            });
          } catch (err) {
            setIsSubmit(false);
            console.error(err);
          }
        }
      }
    },
    [putConfirmCarReturn],
  );

  return (
    <section className="rounded-xl border border-zinc-200 bg-white relative">
      <div className="border-b border-zinc-200 px-5 py-4">
        <h3 className="font-semibold text-zinc-900">Daftar Mobil</h3>

        <p className="mt-1 text-sm text-zinc-500">
          Semua mobil yang terdaftar dalam sistem.
        </p>
      </div>

      <div className="overflow-x-auto min-h-50">
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
                    {car.statusRequest === "REQUEST" ? (
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            handleAction(
                              "popupConfirmReturn",
                              car.pbId,
                              car.status,
                            )
                          }
                          className="inline-flex rounded-full bg-red-400 px-3 py-1 text-xs font-medium text-zinc-700 transition-opacity hover:opacity-80"
                        >
                          Konfirmasi Pengembalian
                        </button>
                        {/* {isConfirmReturn.isOpen &&
                          isConfirmReturn.pbId === car.pbId && (
                            <div className="absolute right-0 top-full z-200 mt-2 w-64 rounded-xl border border-zinc-200 bg-white p-4 shadow-lg">
                              <p className="text-sm font-semibold text-zinc-900">
                                Konfirmasi Pengembalian
                              </p>

                              <p className="mt-1 text-xs leading-5 text-zinc-500">
                                Mobil ini telah dikembalikan. Silakan konfirmasi
                                bahwa mobil sudah diterima dengan baik.
                              </p>

                              <div className="mt-3 flex gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleAction("back", car.pbId, car.status)
                                  }
                                  className="flex-1 rounded-lg border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-50"
                                >
                                  Batal
                                </button>

                                <button
                                  type="button"
                                  disabled={isSubmit}
                                  onClick={() => {
                                    handleAction(
                                      "confirm",
                                      car.pbId,
                                      car.status,
                                    );
                                  }}
                                  className="flex-1 rounded-lg bg-zinc-900 px-3 py-2 text-xs font-medium text-white hover:opacity-90"
                                >
                                  {isSubmit ? (
                                    <div
                                      role="status"
                                      aria-label="Logging in"
                                      className="flex items-center justify-center gap-2"
                                    >
                                      <Spokes className="size-4 animate-spin" />
                                      <span>Loading...</span>
                                    </div>
                                  ) : (
                                    "Konfirmasi"
                                  )}
                                </button>
                              </div>
                            </div>
                          )} */}
                        {isConfirmReturn.isOpen &&
                          isConfirmReturn.pbId === car.pbId && (
                            <div className="fixed inset-0 z-200 flex items-center justify-center  bg-black/30">
                              <div className="w-64 rounded-xl border border-zinc-200 bg-white p-4 shadow-lg">
                                <p className="text-sm font-semibold text-zinc-900">
                                  Konfirmasi Pengembalian
                                </p>

                                <p className="mt-1 text-xs leading-5 text-zinc-500">
                                  Mobil ini telah dikembalikan. Silakan
                                  konfirmasi bahwa mobil sudah diterima dengan
                                  baik.
                                </p>

                                <div className="mt-3 flex gap-2">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleAction("back", car.pbId, car.status)
                                    }
                                    className="flex-1 rounded-lg border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-50"
                                  >
                                    Batal
                                  </button>

                                  <button
                                    type="button"
                                    disabled={isSubmit}
                                    onClick={() => {
                                      handleAction(
                                        "confirm",
                                        car.pbId,
                                        car.status,
                                      );
                                    }}
                                    className="flex-1 rounded-lg bg-zinc-900 px-3 py-2 text-xs font-medium text-white hover:opacity-90"
                                  >
                                    {isSubmit ? (
                                      <div
                                        role="status"
                                        aria-label="Loading"
                                        className="flex items-center justify-center gap-2"
                                      >
                                        <Spokes className="size-4 animate-spin" />
                                        <span>Loading...</span>
                                      </div>
                                    ) : (
                                      "Konfirmasi"
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                      </div>
                    ) : (
                      <div className="relative">
                        <p className="inline-flex rounded-full bg-green-400 px-3 py-1 text-xs font-medium text-zinc-700 transition-opacity hover:opacity-80">
                          Status sudah dikonfirmasi
                        </p>
                      </div>
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

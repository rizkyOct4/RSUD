"use client";

import { DashboardContext } from "@/app/context/context";
import { useContext, useCallback } from "react";
import { useRouter } from "next/navigation";

type TCarListDashboard = {
  setIsRented: any;
};

const CarListDashboard = ({ setIsRented }: TCarListDashboard) => {
  const router = useRouter();

  const {
    carFilter,
    DashboardCarListData,
    isFCarListData,
    DashboardSearchCarListData,
    isFSearchCarListData,
  } = useContext(DashboardContext);

  // const availableCars = DashboardCarListData.filter(
  //   (car: { status: string }) => car?.status === "ACTIVE",
  // );

  const dataUsed = carFilter.brand
    ? DashboardSearchCarListData
    : DashboardCarListData;

  return (
    <section>
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900">
            Mobil Tersedia
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Pilih mobil yang sesuai dengan kebutuhan Anda.
          </p>
        </div>
        {/* 
        <span className="text-sm text-zinc-500">
          {availableCars.length} tersedia
        </span> */}
      </div>

      {/* Cars */}
      <div className="flex flex-wrap gap-4">
        <>
          {isFCarListData || isFSearchCarListData ? (
            <p>Loading ... </p>
          ) : (
            <>
              {Array.isArray(dataUsed) &&
                dataUsed.length > 0 &&
                dataUsed.map((car) => (
                  <article
                    key={car?.pbId}
                    className="w-full rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
                  >
                    {/* Car Header */}
                    <div className="mb-5">
                      <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                        {car?.brand}
                      </p>

                      <h4 className="mt-1 text-xl font-semibold text-zinc-900">
                        {car?.model}
                      </h4>

                      <p className="mt-1 text-sm text-zinc-500">
                        {car?.plateNumber}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-5 border-t border-zinc-100 pt-4 flex">
                      <div className="flex flex-col">
                        <p className="text-xs text-zinc-400">
                          Harga sewa per hari
                        </p>

                        <p className="mt-1 text-lg font-semibold text-zinc-900">
                          Rp{car?.dailyRate.toLocaleString("id-ID")}
                        </p>
                      </div>
                      {car?.status === "RENTED" && (
                        <p className="mt-1 text-sm text-red-600">RENTED</p>
                      )}
                    </div>

                    {/* Action */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsRented({
                          open: true,
                          pbId: car?.pbId,
                          brand: car?.brand,
                          model: car?.model,
                          plateNumber: car?.plateNumber,
                          dailyRate: car?.dailyRate,
                        });
                      }}
                      className="h-10 w-full rounded-lg border border-zinc-900 bg-zinc-900 text-sm font-medium text-white transition-opacity hover:opacity-90"
                    >
                      Pilih Mobil
                    </button>
                  </article>
                ))}
            </>
          )}
        </>
      </div>
    </section>
  );
};

export default CarListDashboard;

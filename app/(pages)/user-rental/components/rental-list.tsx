"use client";

import { useContext } from "react";
import { UserCarRentalContext } from "@/app/context/context";
import { formatLocalDate } from "@/_util/format-date";

const RentalList = ({ setState }: any) => {
  const { CarRentalListData, isFCarRentalListData } =
    useContext(UserCarRentalContext);
  return (
    <div className="flex flex-wrap gap-4">
      {isFCarRentalListData ? (
        <p>Loading ...</p>
      ) : (
        <>
          {Array.isArray(CarRentalListData) && CarRentalListData.length > 0
            ? CarRentalListData.map((rental) => (
                <div
                  key={rental.id}
                  className="w-full rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:w-[calc(50%-0.5rem)]"
                >
                  {/* Car Info */}
                  <div className="mb-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-semibold text-zinc-900">
                          {rental.brand} {rental.model}
                        </h2>

                        <p className="mt-1 text-sm font-medium text-zinc-500">
                          {rental.plateNumber}
                        </p>
                      </div>

                      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                        {rental.status ?? "Rental"}
                      </span>
                    </div>
                  </div>

                  {/* Rental Info */}
                  <div className="flex flex-col gap-3 border-t border-zinc-100 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-zinc-500">Periode</span>

                      <span className="text-sm font-medium text-zinc-900">
                        {formatLocalDate(rental.startDate)} -{" "}
                        {formatLocalDate(rental.endDate)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-zinc-500">Durasi</span>

                      <span className="text-sm font-medium text-zinc-900">
                        {rental.totalDays} Hari
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-zinc-500">Total Biaya</span>

                      <span className="text-sm font-medium text-zinc-900">
                        Rp {rental.totalCost.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>

                  {/* Return Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setState({
                        isOpen: true,
                        carId: rental.carPublicId,
                        id: rental.id,
                        plateNumber: rental.plateNumber,
                      });
                    }}
                    className="mt-5 h-11 w-full rounded-lg bg-zinc-900 text-sm font-medium text-white transition hover:bg-zinc-800"
                  >
                    Kembalikan Mobil
                  </button>
                </div>
              ))
            : null}
        </>
      )}
    </div>
  );
};

export default RentalList;

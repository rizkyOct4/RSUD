"use client";

import { useSessionClient } from "@/_util/c-session";
import { useRouter } from "next/navigation";
import { useContext, useCallback, useState } from "react";
import { DashboardContext } from "@/app/context/context";
import { Spokes } from "@/components/ui/spokes";
import { ToastPromise } from "@/_util/toast";

type RentCarFormProps = {
  isRented: {
    open: boolean;
    pbId: string | null;
    brand: string;
    model: string;
    plateNumber: string;
    dailyRate: number;
  };
  setIsRented: any;
};

const RentCarForm = ({ isRented, setIsRented }: RentCarFormProps) => {
  const { postRentCar } = useContext(DashboardContext);

  const router = useRouter();
  const session = useSessionClient();
  const publicId = session?.publicId;

  const { pbId, brand, model, plateNumber, dailyRate } = isRented;

  const [isSubmit, setIsSubmit] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const submit = useCallback(
    async (e: any) => {
      e.preventDefault();
      try {
        if (!publicId) {
          router.push("/auth");
          return;
        }
        setIsSubmit(true);

        const totalDays =
          (new Date(endDate).getTime() - new Date(startDate).getTime()) /
          (1000 * 60 * 60 * 24);

        const totalRent = dailyRate * totalDays;

        const post = {
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          pbId: pbId,
          createdAt: new Date(),
          totalDays: Number(totalDays),
          totalRent: Number(totalRent),
        };
        // console.log(post);
        const res = postRentCar(post);

        ToastPromise(res);

        await res;
        setIsSubmit(false);
        setIsRented({
          open: false,
          pbId: null,
          brand: "",
          model: "",
          plateNumber: "",
          dailyRate: null,
        });
      } catch (err) {
        setIsSubmit(false);
        console.error(err);
      }
    },
    [dailyRate, endDate, pbId, postRentCar, publicId, router, setIsRented, startDate],
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
      {/* Popup */}
      <div className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
            Penyewaan Mobil
          </p>

          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900">
            Sewa Mobil
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Tentukan periode penyewaan mobil.
          </p>
        </div>

        {/* Car Information */}
        <div className="mb-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                {brand}
              </p>

              <h3 className="mt-1 text-xl font-semibold text-zinc-900">
                {model}
              </h3>

              <p className="mt-1 text-sm text-zinc-500">{plateNumber}</p>
            </div>

            <div className="text-right">
              <p className="text-xs text-zinc-400">Harga / hari</p>

              <p className="mt-1 text-sm font-semibold text-zinc-900">
                Rp{dailyRate?.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={(e) => submit(e)}>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Periode Penyewaan
            </label>

            <p className="text-sm text-zinc-500">
              Tentukan tanggal mulai dan tanggal selesai penyewaan.
            </p>
          </div>

          {/* Dates */}
          <div className="flex flex-col gap-5 sm:flex-row">
            {/* Start Date */}
            <div className="w-full space-y-2">
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-zinc-700"
              >
                Tanggal Mulai
              </label>

              <input
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                id="startDate"
                name="startDate"
                type="date"
                required
                className="h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-900"
              />
            </div>

            {/* End Date */}
            <div className="w-full space-y-2">
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-zinc-700"
              >
                Tanggal Selesai
              </label>

              <input
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                id="endDate"
                name="endDate"
                type="date"
                required
                className="h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-900"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                setIsRented({
                  open: false,
                  pbId: null,
                  brand: "",
                  model: "",
                  plateNumber: "",
                  dailyRate: null,
                })
              }
              className="h-11 flex-1 rounded-lg border border-zinc-300 bg-white px-6 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
            >
              Batal
            </button>

            {/* <button
              type="submit"
              className="h-11 flex-1 rounded-lg bg-zinc-900 px-6 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Sewa Mobil
            </button> */}
            <button
              type="submit"
              disabled={isSubmit}
              className="
                              mt-auto h-11 w-full rounded-lg
                              bg-emerald-500
                              text-sm font-semibold text-white
                              hover:bg-emerald-600
                              disabled:cursor-not-allowed
                              disabled:opacity-60
                            "
            >
              {isSubmit ? (
                <div
                  role="status"
                  aria-label="Registering account"
                  className="flex items-center justify-center gap-2"
                >
                  <Spokes className="size-4 animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                "Sewa Mobil"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RentCarForm;

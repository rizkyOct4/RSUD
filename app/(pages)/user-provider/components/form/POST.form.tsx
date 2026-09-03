"use client";

import { useMemo, useContext, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Car, Hash, Tag, DollarSign, X } from "lucide-react";
import { PostCarSchema, zPostCarSchema } from "../../z-schema/z.schema";
import { UserCarProviderContext } from "@/app/context/context";
import { nanoid } from "nanoid";
import { ToastPromise } from "@/_util/toast";
import { Spokes } from "@/components/ui/spokes";

type CarFormProps = {
  onBack: () => void;
};

const carOptions = [
  {
    brand: "Toyota",
    models: ["Avanza", "Innova", "Fortuner", "Rush", "Yaris"],
  },
  {
    brand: "Honda",
    models: ["Brio", "City", "Civic", "HR-V", "CR-V"],
  },
  {
    brand: "Mitsubishi",
    models: ["Xpander", "Pajero Sport", "Outlander"],
  },
  {
    brand: "Suzuki",
    models: ["Ertiga", "XL7", "Baleno", "Jimny"],
  },
  {
    brand: "Daihatsu",
    models: ["Xenia", "Terios", "Sigra", "Ayla"],
  },
];

const CarForm = ({ onBack }: CarFormProps) => {
  const { postCar } = useContext(UserCarProviderContext);

  const [isSubmit, setIsSubmit] = useState(false);

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
    control,
  } = useForm<PostCarSchema>({
    resolver: zodResolver(zPostCarSchema),
    mode: "onChange",
  });

  const selectedBrand = useWatch({
    control,
    name: "brand",
  });
  //   const selectedBrand = watch("brand");

  const availableModels = useMemo(() => {
    return carOptions.find((car) => car.brand === selectedBrand)?.models ?? [];
  }, [selectedBrand]);

  const submit = handleSubmit(async (values) => {
    try {
      setIsSubmit(true);
      const pbId = nanoid(8);

      const post = {
        ...values,
        pbId: pbId,
        createdAt: new Date(),
      };

      const res = postCar(post);
      ToastPromise(res);
      await res;

      setIsSubmit(false);
      onBack();
    } catch (err) {
      console.error(err);
      setIsSubmit(false);
    }
  });

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl sm:p-8">
        {/* Back */}
        <button
          type="button"
          onClick={onBack}
          className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-lg text-zinc-500 outline-none focus:ring-2 focus:ring-emerald-500/20"
          aria-label="Kembali"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-8 pr-10">
          <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-emerald-50">
            <Car size={20} className="text-emerald-600" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">
            Tambah Mobil
          </h1>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Tambahkan mobil baru ke dalam sistem rental.
          </p>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-5">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="brand"
              className="text-sm font-medium text-zinc-800"
            >
              Merek Mobil
            </label>

            <div className="relative">
              <Car
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
              />

              <select
                id="brand"
                {...register("brand")}
                className={`h-11 w-full appearance-none rounded-lg border bg-white pl-10 pr-3.5 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-emerald-500/10 ${
                  errors.brand
                    ? "border-red-400 focus:border-red-500"
                    : "border-zinc-300 focus:border-emerald-500"
                }`}
              >
                <option value="">Pilih merek mobil</option>

                {carOptions.map((car) => (
                  <option key={car.brand} value={car.brand}>
                    {car.brand}
                  </option>
                ))}
              </select>
            </div>

            {errors.brand && (
              <p className="text-xs text-red-500">{errors.brand.message}</p>
            )}
          </div>

          {/* Model */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="model"
              className="text-sm font-medium text-zinc-800"
            >
              Model Mobil
            </label>

            <div className="relative">
              <Tag
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
              />

              <select
                id="model"
                disabled={!selectedBrand}
                {...register("model")}
                className={`h-11 w-full appearance-none rounded-lg border bg-white pl-10 pr-3.5 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-emerald-500/10 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400 ${
                  errors.model
                    ? "border-red-400 focus:border-red-500"
                    : "border-zinc-300 focus:border-emerald-500"
                }`}
              >
                <option value="">
                  {selectedBrand
                    ? "Pilih model mobil"
                    : "Pilih merek terlebih dahulu"}
                </option>

                {availableModels.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            {errors.model && (
              <p className="text-xs text-red-500">{errors.model.message}</p>
            )}
          </div>

          {/* Plate Number */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="plateNumber"
              className="text-sm font-medium text-zinc-800"
            >
              Nomor Plat
            </label>

            <div className="relative">
              <Hash
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
              />

              <input
                id="plateNumber"
                type="text"
                placeholder="BM 1234 AB"
                autoComplete="off"
                {...register("plateNumber")}
                className={`h-11 w-full rounded-lg border bg-white pl-10 pr-3.5 text-sm uppercase text-zinc-900 outline-none placeholder:normal-case placeholder:text-zinc-400 focus:ring-2 focus:ring-emerald-500/10 ${
                  errors.plateNumber
                    ? "border-red-400 focus:border-red-500"
                    : "border-zinc-300 focus:border-emerald-500"
                }`}
              />
            </div>

            {errors.plateNumber && (
              <p className="text-xs text-red-500">
                {errors.plateNumber.message}
              </p>
            )}
          </div>

          {/* Daily Rate */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="dailyRate"
              className="text-sm font-medium text-zinc-800"
            >
              Tarif Sewa per Hari
            </label>

            <div className="relative">
              <DollarSign
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
              />

              <input
                id="dailyRate"
                type="number"
                min="0"
                placeholder="350000"
                inputMode="numeric"
                {...register("dailyRate")}
                className={`h-11 w-full rounded-lg border bg-white pl-10 pr-3.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-emerald-500/10 ${
                  errors.dailyRate
                    ? "border-red-400 focus:border-red-500"
                    : "border-zinc-300 focus:border-emerald-500"
                }`}
              />
            </div>

            <p className="text-xs text-zinc-400">
              Masukkan tarif dalam Rupiah per hari.
            </p>

            {errors.dailyRate && (
              <p className="text-xs text-red-500">{errors.dailyRate.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmit}
            className="
                    flex h-11 w-full items-center justify-center
                    rounded-lg bg-emerald-500
                    text-sm font-semibold text-white
                    hover:bg-emerald-600
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
          >
            {isSubmit ? (
              <div
                role="status"
                aria-label="Logging in"
                className="flex items-center justify-center gap-2"
              >
                <Spokes className="size-4 animate-spin" />
                <span>Masuk...</span>
              </div>
            ) : (
              "Tambah Mobil"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CarForm;

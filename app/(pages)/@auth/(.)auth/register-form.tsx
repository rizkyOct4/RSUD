"use client";

import {
  zRegisterFormSchema,
  RegisterFormSchema,
} from "../../auth/z-schema/z.schema";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spokes } from "@/components/ui/spokes";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ToastPromise } from "@/_util/toast";
import { ROUTES_AUTH } from "../../auth/config-route/route.config";

type TRegisterFormProps = {
  onBack: () => void;
};

const RegisterForm = ({ onBack }: TRegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState,
    reset,
    setValue,
    getValues,
    control,
  } = useForm<RegisterFormSchema>({
    // ? REGEXNYA DISINI TERJADI !!!!
    resolver: zodResolver(zRegisterFormSchema),
    mode: "onChange",
  });

  const [isSubmit, setIsSubmit] = useState(false);

  const submit = handleSubmit(async (values) => {
    try {
      setIsSubmit(true);

      const URL = ROUTES_AUTH.POST({ key: "register" });
      const res = axios.post(URL, {
        ...values,
        phoneNumber: values.phoneNumber,
        sim: values.sim,
        createdAt: new Date(),
      });

      ToastPromise(res);

      await res;

      reset();

      setIsSubmit(false);
      onBack();
    } catch (err) {
      setIsSubmit(false);
      console.error(err);
    }
  });

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">
          Registrasi Pengguna
        </h1>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          Daftarkan diri Anda untuk menggunakan layanan persewaan mobil.
        </p>

        <button
          type="button"
          onClick={onBack}
          className="mt-3 text-sm font-medium text-emerald-600 hover:text-emerald-700"
        >
          Sudah punya akun? Masuk
        </button>
      </div>

      {/* Form */}
      <form onSubmit={submit}>
        <div className="flex flex-col gap-6 md:flex-row md:gap-8">
          {/* LEFT */}
          <div className="flex w-full flex-col gap-5 md:w-1/2">
            {/* Nama */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-zinc-800"
              >
                Nama Lengkap
              </label>

              <input
                {...register("name")}
                id="name"
                type="text"
                placeholder="Masukkan nama lengkap"
                autoComplete="name"
                className="
                    h-11 w-full rounded-lg border border-zinc-300
                    bg-white px-3.5 text-sm text-zinc-900
                    outline-none placeholder:text-zinc-400
                    focus:border-emerald-500
                    focus:ring-2 focus:ring-emerald-500/10
                  "
              />

              {formState.errors.name && (
                <p className="text-xs text-red-500">
                  {formState.errors.name.message}
                </p>
              )}
            </div>

            {/* Alamat */}
            <div className="space-y-2">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-zinc-800"
              >
                Alamat
              </label>

              <textarea
                {...register("address")}
                id="address"
                rows={4}
                placeholder="Masukkan alamat lengkap"
                autoComplete="street-address"
                className="
                    w-full resize-none rounded-lg border border-zinc-300
                    bg-white px-3.5 py-3 text-sm text-zinc-900
                    outline-none placeholder:text-zinc-400
                    focus:border-emerald-500
                    focus:ring-2 focus:ring-emerald-500/10
                  "
              />

              {formState.errors.address && (
                <p className="text-xs text-red-500">
                  {formState.errors.address.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-zinc-800"
              >
                Nomor Telepon
              </label>

              <input
                {...register("phoneNumber")}
                id="phoneNumber"
                type="number"
                inputMode="numeric"
                placeholder="08xxxxxxxxxx"
                autoComplete="tel"
                className="
                    h-11 w-full rounded-lg border border-zinc-300
                    bg-white px-3.5 text-sm text-zinc-900
                    outline-none placeholder:text-zinc-400
                    focus:border-emerald-500
                    focus:ring-2 focus:ring-emerald-500/10
                  "
              />

              {formState.errors.phoneNumber && (
                <p className="text-xs text-red-500">
                  {formState.errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* SIM */}
            <div className="space-y-2">
              <label
                htmlFor="sim"
                className="block text-sm font-medium text-zinc-800"
              >
                Nomor SIM
              </label>

              <input
                {...register("sim")}
                id="sim"
                type="number"
                placeholder="Masukkan nomor SIM"
                className="
                    h-11 w-full rounded-lg border border-zinc-300
                    bg-white px-3.5 text-sm text-zinc-900
                    outline-none placeholder:text-zinc-400
                    focus:border-emerald-500
                    focus:ring-2 focus:ring-emerald-500/10
                  "
              />

              {formState.errors.sim && (
                <p className="text-xs text-red-500">
                  {formState.errors.sim.message}
                </p>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex w-full flex-col gap-5 md:w-1/2">
            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-800"
              >
                Password
              </label>

              <input
                {...register("password")}
                id="password"
                type="password"
                placeholder="Masukkan password"
                autoComplete="new-password"
                className="
                    h-11 w-full rounded-lg border border-zinc-300
                    bg-white px-3.5 text-sm text-zinc-900
                    outline-none placeholder:text-zinc-400
                    focus:border-emerald-500
                    focus:ring-2 focus:ring-emerald-500/10
                  "
              />

              {formState.errors.password && (
                <p className="text-xs text-red-500">
                  {formState.errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-zinc-800"
              >
                Konfirmasi Password
              </label>

              <input
                {...register("confirmPassword")}
                id="confirmPassword"
                type="password"
                placeholder="Masukkan kembali password"
                autoComplete="new-password"
                className="
                    h-11 w-full rounded-lg border border-zinc-300
                    bg-white px-3.5 text-sm text-zinc-900
                    outline-none placeholder:text-zinc-400
                    focus:border-emerald-500
                    focus:ring-2 focus:ring-emerald-500/10
                  "
              />

              {formState.errors.confirmPassword && (
                <p className="text-xs text-red-500">
                  {formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* User Model */}
            <div className="space-y-2">
              <label
                htmlFor="userModel"
                className="block text-sm font-medium text-zinc-800"
              >
                Tipe Pengguna
              </label>

              <select
                {...register("userModel")}
                id="userModel"
                className="
                    h-11 w-full rounded-lg border border-zinc-300
                    bg-white px-3.5 text-sm text-zinc-900
                    outline-none
                    focus:border-emerald-500
                    focus:ring-2 focus:ring-emerald-500/10
                  "
              >
                <option value="CUSTOMER">Customer</option>
                <option value="PROVIDER">Provider</option>
              </select>

              {formState.errors.userModel && (
                <p className="text-xs text-red-500">
                  {formState.errors.userModel.message}
                </p>
              )}
            </div>

            {/* Submit */}
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
                  <span>Mendaftarkan...</span>
                </div>
              ) : (
                "Daftar"
              )}
            </button>
          </div>
        </div>
      </form>

      <p className="mt-8 text-center text-xs leading-5 text-zinc-500">
        Pastikan seluruh data yang Anda masukkan sudah benar.
      </p>
    </div>
  );
};

export default RegisterForm;

"use client";

import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { zLoginFormSchema } from "../../auth/z-schema/z.schema";
import { signIn } from "next-auth/react";
import { Spokes } from "@/components/ui/spokes";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

type LoginFormSchema = z.infer<typeof zLoginFormSchema>;

type TLoginFormProps = {
  onBack: () => void;
};

const LoginForm = ({ onBack }: TLoginFormProps) => {
  const router = useRouter();
  const redirect = useSearchParams().get("redirect") ?? "/";

  const [isSubmit, setIsSubmit] = useState(false);

  const { register, handleSubmit, formState } = useForm<LoginFormSchema>({
    // ? REGEXNYA DISINI TERJADI !!!!
    resolver: zodResolver(zLoginFormSchema),
    mode: "onChange",
  });

  const submit = handleSubmit(async (values) => {
    try {
      setIsSubmit(true);
      const res = await signIn("credentials", {
        sim: values.sim,
        password: values.password,
        redirect: false,
      });
      if (res?.error) {
        toast.error("SIM or password was wrong");
      } else {
        router.refresh();
        router.push(redirect);
        toast.success("Login Success");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmit(false);
    }
  });

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">
          Login
        </h1>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          Masuk ke akun Anda untuk melanjutkan.
        </p>

        <button
          type="button"
          onClick={onBack}
          className="mt-3 text-sm font-medium text-emerald-600 hover:text-emerald-700"
        >
          Belum punya akun? Daftar
        </button>
      </div>

      {/* Form */}
      <form className="space-y-5" onSubmit={submit}>
        {/* Email */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label
              htmlFor="sim"
              className="block text-sm font-medium text-zinc-800"
            >
              SIM
            </label>

            {formState.errors.sim && (
              <p className="text-xs text-red-500">
                {formState.errors.sim.message}
              </p>
            )}
          </div>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              {...register("sim")}
              type="number"
              autoComplete="sim"
              className="
              h-11 w-full rounded-lg border border-zinc-300
              bg-white pl-10 pr-3.5
              text-sm text-zinc-900
              outline-none
              placeholder:text-zinc-400
              focus:border-emerald-500
              focus:ring-2 focus:ring-emerald-500/10
            "
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-zinc-800"
              >
                Password
              </label>

              {formState.errors.password && (
                <p className="text-xs text-red-500">
                  {formState.errors.password.message}
                </p>
              )}
            </div>

            <Link
              href="/forgot-password"
              className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              Lupa password?
            </Link>
          </div>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              {...register("password")}
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              className="
              h-11 w-full rounded-lg border border-zinc-300
              bg-white pl-10 pr-3.5
              text-sm text-zinc-900
              outline-none
              placeholder:text-zinc-400
              focus:border-emerald-500
              focus:ring-2 focus:ring-emerald-500/10
            "
            />
          </div>
        </div>

        {/* Login */}
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
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

"use client";

import { useState } from "react";

type ReturnCarConfirmProps = {
  plateNumber: string;
  onBack: () => void;
//   onCancel: () => void;
};

const ReturnCarConfirmForm = ({
  plateNumber,
  onBack,
//   onCancel,
}: ReturnCarConfirmProps) => {
  const [inputPlate, setInputPlate] = useState("");

  const isCorrect =
    inputPlate.trim().toUpperCase() === plateNumber.toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-zinc-900">
          Konfirmasi Pengembalian
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Masukkan nomor plat mobil untuk melanjutkan.
        </p>

        <div className="mt-5">
          <label
            htmlFor="plateNumber"
            className="mb-2 block text-sm font-medium text-zinc-700"
          >
            Nomor Plat Mobil: {plateNumber}
          </label>

          <input
            id="plateNumber"
            type="text"
            value={inputPlate}
            onChange={(e) => setInputPlate(e.target.value.toUpperCase())}
            placeholder="Contoh: BM 1234 AB"
            autoFocus
            className={`h-11 w-full rounded-lg border bg-white px-3 text-sm text-zinc-900 outline-none ${
              inputPlate && !isCorrect
                ? "border-red-400"
                : "border-zinc-300 focus:border-zinc-900"
            }`}
          />

          {inputPlate && !isCorrect && (
            <p className="mt-2 text-xs text-red-500">
              Nomor plat tidak sesuai.
            </p>
          )}

          {isCorrect && (
            <p className="mt-2 text-xs text-green-600">Nomor plat sesuai.</p>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="h-11 flex-1 rounded-lg border border-zinc-300 bg-white text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            Batal
          </button>

          <button
            type="button"
            // onClick={onConfirm}
            disabled={!isCorrect}
            className="h-11 flex-1 rounded-lg bg-zinc-900 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnCarConfirmForm;

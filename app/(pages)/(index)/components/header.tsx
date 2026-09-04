"use client";

import { memo } from "react";

const HeaderDashboard = () => {
  return (
    <section className="mb-8">
      <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">
        Sewa Mobil
      </h2>

      <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
        Pilih tanggal penyewaan untuk melihat mobil yang tersedia.
      </p>
    </section>
  );
};

export default memo(HeaderDashboard);

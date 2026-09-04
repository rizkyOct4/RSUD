"use client";

import { memo } from "react";

const Header = () => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-zinc-900">
        Pengembalian Mobil
      </h1>

      <p className="mt-1 text-sm text-zinc-500">
        Pilih mobil yang ingin dikembalikan.
      </p>
    </div>
  );
};

export default memo(Header);

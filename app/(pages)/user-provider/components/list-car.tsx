const mockCars = [
  {
    id: "CAR-001",
    brand: "Toyota",
    model: "Avanza",
    plateNumber: "BM 1234 AB",
    dailyRate: 350000,
    status: "AVAILABLE",
  },
  {
    id: "CAR-002",
    brand: "Honda",
    model: "Brio",
    plateNumber: "BM 5678 CD",
    dailyRate: 250000,
    status: "AVAILABLE",
  },
  {
    id: "CAR-003",
    brand: "Mitsubishi",
    model: "Xpander",
    plateNumber: "BM 9012 EF",
    dailyRate: 450000,
    status: "RENTED",
  },
  {
    id: "CAR-004",
    brand: "Toyota",
    model: "Innova",
    plateNumber: "BM 3456 GH",
    dailyRate: 550000,
    status: "AVAILABLE",
  },
  {
    id: "CAR-005",
    brand: "Daihatsu",
    model: "Terios",
    plateNumber: "BM 7890 IJ",
    dailyRate: 400000,
    status: "RENTED",
  },
];

const ListCar = () => {
  const availableCars = mockCars.filter((car) => car.status === "AVAILABLE");

  const rentedCars = mockCars.filter((car) => car.status === "RENTED");

  return (
    <>
      {/* Statistics */}
      <section className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <p className="text-sm text-zinc-500">Total Mobil</p>

          <p className="mt-2 text-2xl font-semibold text-zinc-900">
            {mockCars.length}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <p className="text-sm text-zinc-500">Tersedia</p>

          <p className="mt-2 text-2xl font-semibold text-zinc-900">
            {availableCars.length}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <p className="text-sm text-zinc-500">Sedang Disewa</p>

          <p className="mt-2 text-2xl font-semibold text-zinc-900">
            {rentedCars.length}
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="mb-6 rounded-xl border border-zinc-200 bg-white p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
          <div className="space-y-2">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-zinc-700"
            >
              Cari Mobil
            </label>

            <input
              id="search"
              type="text"
              placeholder="Merek, model, atau nomor plat"
              className="h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-900"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-zinc-700"
            >
              Merek
            </label>

            <select
              id="brand"
              className="h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-zinc-900"
              defaultValue=""
            >
              <option value="">Semua Merek</option>
              <option value="toyota">Toyota</option>
              <option value="honda">Honda</option>
              <option value="mitsubishi">Mitsubishi</option>
              <option value="daihatsu">Daihatsu</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-zinc-700"
            >
              Ketersediaan
            </label>

            <select
              id="status"
              className="h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-zinc-900"
              defaultValue=""
            >
              <option value="">Semua</option>
              <option value="available">Tersedia</option>
              <option value="rented">Sedang Disewa</option>
            </select>
          </div>
        </div>
      </section>

      {/* Car List */}
      <section className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <div className="border-b border-zinc-200 px-5 py-4">
          <h3 className="font-semibold text-zinc-900">Daftar Mobil</h3>

          <p className="mt-1 text-sm text-zinc-500">
            Semua mobil yang terdaftar dalam sistem.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
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
              {mockCars.map((car) => (
                <tr key={car.id} className="transition-colors hover:bg-zinc-50">
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium text-zinc-900">
                        {car.brand} {car.model}
                      </p>

                      <p className="mt-1 text-xs text-zinc-400">{car.id}</p>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-zinc-600">
                    {car.plateNumber}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-zinc-900">
                    Rp{car.dailyRate.toLocaleString("id-ID")}
                  </td>

                  <td className="px-5 py-4">
                    {car.status === "AVAILABLE" ? (
                      <span className="inline-flex rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                        Tersedia
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white">
                        Sedang Disewa
                      </span>
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
    </>
  );
};

export default ListCar;

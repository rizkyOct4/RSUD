"use client";


export const mockCars = [
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
    status: "AVAILABLE",
  },
  {
    id: "CAR-004",
    brand: "Toyota",
    model: "Innova",
    plateNumber: "BM 3456 GH",
    dailyRate: 550000,
    status: "RENTED",
  },
  {
    id: "CAR-005",
    brand: "Daihatsu",
    model: "Terios",
    plateNumber: "BM 7890 IJ",
    dailyRate: 400000,
    status: "AVAILABLE",
  },
];

const ModalBorrow = () => {

  return (
    <main className="min-h-screen bg-zinc-50">

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* Header */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">
            Sewa Mobil
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
            Pilih tanggal penyewaan untuk melihat mobil yang tersedia.
          </p>
        </section>

        {/* Search */}
        <section className="mb-10 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="grid gap-5 md:grid-cols-[1fr_1fr_auto] md:items-end">
            {/* Start Date */}
            <div className="space-y-2">
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-zinc-700"
              >
                Tanggal Mulai
              </label>

              <input
                id="startDate"
                type="date"
                className="h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-900"
              />
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-zinc-700"
              >
                Tanggal Selesai
              </label>

              <input
                id="endDate"
                type="date"
                className="h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-900"
              />
            </div>

            {/* Search Button */}
            <button
              type="button"
              className="h-11 rounded-lg bg-zinc-900 px-6 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Cari Mobil
            </button>
          </div>
        </section>

        {/* Available Cars */}
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

            <span className="text-sm text-zinc-500">
              {mockCars.filter((car) => car.status === "AVAILABLE").length}{" "}
              tersedia
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockCars
              .filter((car) => car.status === "AVAILABLE")
              .map((car) => (
                <article
                  key={car.id}
                  className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
                >
                  {/* Car Header */}
                  <div className="mb-5">
                    <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                      {car.brand}
                    </p>

                    <h4 className="mt-1 text-xl font-semibold text-zinc-900">
                      {car.model}
                    </h4>

                    <p className="mt-1 text-sm text-zinc-500">
                      {car.plateNumber}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-5 border-t border-zinc-100 pt-4">
                    <p className="text-xs text-zinc-400">Harga sewa per hari</p>

                    <p className="mt-1 text-lg font-semibold text-zinc-900">
                      Rp{car.dailyRate.toLocaleString("id-ID")}
                    </p>
                  </div>

                  {/* Action */}
                  <button
                    type="button"
                    className="h-10 w-full rounded-lg border border-zinc-900 bg-zinc-900 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  >
                    Pilih Mobil
                  </button>
                </article>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ModalBorrow;

"use client";

const mockRentals = [
  {
    pbId: "PB-001",
    brand: "Toyota",
    model: "Avanza",
    plateNumber: "BM 1234 AB",
    dailyRate: 350000,
    startDate: "2026-09-01",
    endDate: "2026-09-04",
  },
  {
    pbId: "PB-002",
    brand: "Honda",
    model: "Brio",
    plateNumber: "BM 5678 CD",
    dailyRate: 300000,
    startDate: "2026-09-03",
    endDate: "2026-09-07",
  },
];

const RentalList = ({setState}: any) => {
  return (
    <div className="flex flex-wrap gap-4">
      {mockRentals.map((rental) => (
        <div
          key={rental.pbId}
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
                Disewa
              </span>
            </div>
          </div>

          {/* Rental Info */}
          <div className="flex flex-col gap-3 border-t border-zinc-100 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-500">Periode</span>

              <span className="text-sm font-medium text-zinc-900">
                {rental.startDate} - {rental.endDate}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-500">Tarif / Hari</span>

              <span className="text-sm font-medium text-zinc-900">
                Rp {rental.dailyRate.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          {/* Return Button */}
          <button
            type="button"
            onClick={() => {
              setState({
                isOpen: true,
                plateNumber: rental.plateNumber,
              });
            }}
            className="mt-5 h-11 w-full rounded-lg bg-zinc-900 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Kembalikan Mobil
          </button>
        </div>
      ))}
    </div>
  );
};

export default RentalList;

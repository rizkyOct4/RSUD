"use client";

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

const Statistics = () => {
  const availableCars = mockCars.filter((car) => car.status === "AVAILABLE");

  const rentedCars = mockCars.filter((car) => car.status === "RENTED");
  return (
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
  );
};

export default Statistics;

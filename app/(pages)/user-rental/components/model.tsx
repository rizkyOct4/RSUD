"use client";

import { useState, useMemo } from "react";
import ReturnCarConfirmForm from "./form/PUT-confirm";
import Header from "./header";
import RentalList from "./rental-list";

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

const ModelReturnCar = () => {
  const [state, setState] = useState({
    isOpen: false,
    carId: "",
    id: "",
    plateNumber: "",
  });

  const render = useMemo(() => {
    if (state.isOpen) {
      return (
        <ReturnCarConfirmForm
          carId={state.carId}
          id={state.id}
          plateNumber={state.plateNumber}
          onBack={() =>
            setState({
              isOpen: false,
              carId: "",
              id: "",
              plateNumber: "",
            })
          }
        />
      );
    }
  }, [state.carId, state.id, state.isOpen, state.plateNumber]);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
      {/* Header */}
      <Header />

      {/* Rental List */}
      <RentalList setState={setState} />

      {/* Empty State */}
      {mockRentals.length === 0 && (
        <div className="rounded-2xl border border-dashed border-zinc-300 py-12 text-center">
          <p className="text-sm text-zinc-500">
            Tidak ada mobil yang sedang disewa.
          </p>
        </div>
      )}

      {render}
    </main>
  );
};

export default ModelReturnCar;

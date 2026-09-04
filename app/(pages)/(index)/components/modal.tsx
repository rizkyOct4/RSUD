"use client";

import HeaderDashboard from "./header";
import SearchDashboard from "./search";
import CarListDashboard from "./car-list";
// import RentCarForm from "./form/rented";
import { useState, useMemo } from "react";

import dynamic from "next/dynamic";

const LazyRentCarForm = dynamic(() => import("./form/rented"), {
  loading: () => <p>Loading...</p>,
});

const ModalDashboard = () => {
  const [isRented, setIsRented] = useState({
    open: false,
    pbId: null,
    brand: "",
    model: "",
    plateNumber: "",
    dailyRate: 0,
  });

  const render = useMemo(() => {
    if (isRented.open) {
      return <LazyRentCarForm isRented={isRented} setIsRented={setIsRented}/>;
    }
  }, [isRented]);

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* Header */}
        <HeaderDashboard />

        {/* Search */}
        <SearchDashboard />

        {/* Available Cars */}
        <CarListDashboard setIsRented={setIsRented} />
      </div>
      {render}
    </main>
  );
};

export default ModalDashboard;

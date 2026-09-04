"use client";

import Header from "./header";
import CarList from "./car-list";
import CarForm from "./form/POST.form";
import { useState, useMemo } from "react";
import SearchAndFilter from "./search-and-filter";
import Statistics from "./statistics";

const Modal = () => {
  const [isOpen, setIsOpen] = useState<"index" | "POST">("index");

  const Render = useMemo(() => {
    switch (isOpen) {
      case "POST": {
        return <CarForm onBack={() => setIsOpen("index")} />;
      }
    }
  }, [isOpen]);

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 relative">
        <Header setIsOpen={() => setIsOpen("POST")} />
        <SearchAndFilter />
        <Statistics />
        <CarList />
        {Render}
      </div>
    </main>
  );
};

export default Modal;

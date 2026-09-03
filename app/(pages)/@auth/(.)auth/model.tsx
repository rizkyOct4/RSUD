"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import RegisterForm from "./register-form";
import LoginForm from "./login-form";

const ModelAuth = () => {
  const [isOpen, setIsOpen] = useState("register");

  const Render = useMemo(() => {
    switch (isOpen) {
      case "register": {
        return (
          <RegisterForm
            onBack={() =>
              setIsOpen((prev) => (prev === "register" ? "login" : "register"))
            }
          />
        );
      }
      case "login": {
        return (
          <LoginForm
            onBack={() =>
              setIsOpen((prev) => (prev === "login" ? "register" : "login"))
            }
          />
        );
      }
    }
  }, [isOpen]);


  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 fixed inset-0">
      <section className="mx-auto w-full max-w-4xl h-full overflow-y-scroll">
        {Render}
      </section>
    </main>
  );
};

export default ModelAuth;

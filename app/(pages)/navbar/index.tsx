"use client";

import { useRouter } from "next/navigation";
import { useSessionClient } from "@/_util/c-session";
import dynamic from "next/dynamic";
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../context/context";
import NavbarAction from "./action";

const Navbar = () => {
  const router = useRouter();

  // const { isOpen, setIsOpen, ProfileData, isFetchingProfile } =
  //   useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);

  const session = useSessionClient();
  const publicId = session?.publicId;
  const name = session?.name;
  const userModel = session?.userModel;

  const handleAction = useCallback(
    (actionType: string) => {
      switch (actionType) {
        case "open": {
          setIsOpen((prev: boolean) => !prev);
          break;
        }
      }
    },
    [setIsOpen],
  );

  return (
    <>
      <nav className="border-b border-zinc-200 bg-white fixed top-0 w-full z-200">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              router.push("/");
            }}
          >
            <h1 className="text-lg font-semibold tracking-tight text-zinc-900">
              Rent Car
            </h1>
          </button>

          <div className="flex items-center gap-3">
            {publicId ? (
              <NavbarAction
                name={name}
                handler={() => handleAction("open")}
                // ProfileData={ProfileData}
                isOpen={isOpen}
                // isFetchingProfile={isFetchingProfile}
                setIsOpen={setIsOpen}
                userModel={userModel}
              />
            ) : (
              <button
                type="button"
                onClick={() => router.push("/auth")}
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

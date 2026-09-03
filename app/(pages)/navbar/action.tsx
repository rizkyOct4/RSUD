"use client";

import { User, LogOut, ChevronDown } from "lucide-react";
import { signOut } from "next-auth/react";
import type { TProfileData } from "../auth/types/auth.types";
import { useRouter } from "next/navigation";
import Link from "next/link";

type TNavbarActionProps = {
  name: string | null;
  handler: () => void;
  ProfileData: TProfileData[];
  isOpen: boolean;
  isFetchingProfile: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const NavbarAction = ({
  name,
  handler,
  ProfileData,
  isOpen,
  isFetchingProfile,
  setIsOpen,
}: TNavbarActionProps) => {
  const router = useRouter();

  return (
    <div className="relative flex items-center gap-3">
      <button
        type="button"
        onClick={() => handler()}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="
                  flex items-center gap-2
                  rounded-lg px-3 py-2
                  text-sm font-medium text-zinc-700
                  outline-none
                  focus:ring-2 focus:ring-emerald-500/10
                "
      >
        <User size={17} />

        <span>{name ?? "Account"}</span>

        <ChevronDown size={16} className={isOpen ? "rotate-180" : ""} />
      </button>

      {isOpen && (
        <div
          role="menu"
          className=" absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg"
        >
          {isFetchingProfile ? (
            <p>Loading ...</p>
          ) : (
            <>
              {Array.isArray(ProfileData) &&
                ProfileData.length > 0 &&
                ProfileData.map((i, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (i.userModel === "PROVIDER") {
                        router.push("/user-provider");
                      }
                      if (i.userModel === "CUSTOMER") {
                        router.push("/user-rental");
                      }
                      setIsOpen(false);
                    }}
                    className="
                       flex w-full items-center gap-3
                       rounded-lg px-3 py-2.5
                       text-left text-sm text-zinc-700
                       outline-none
                       focus:bg-zinc-50
                     "
                  >
                    <User size={17} className="text-zinc-500" />
                    <span>{i.userModel}</span>
                  </button>
                ))}

              <div className="my-1 border-t border-zinc-100" />

              <button
                type="button"
                onClick={async () => {
                  setIsOpen(false);
                  await signOut({ callbackUrl: "/" });
                }}
                className="
                      flex w-full items-center gap-3
                      rounded-lg px-3 py-2.5
                      text-left text-sm text-red-600
                      outline-none
                      focus:bg-red-50
                    "
              >
                <LogOut size={17} />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarAction;

"use client";

type HeaderProps = {
  setIsOpen: () => void;
};


const Header = ({ setIsOpen }: HeaderProps) => {
  return (
    <section className="mb-8 flex p-4 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sticky top-16 bg-white">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Manajemen Mobil
        </h2>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          Kelola data mobil yang tersedia untuk disewakan.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen()}
        className="h-10 rounded-lg bg-zinc-900 px-5 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        + Tambah Mobil
      </button>
    </section>
  );
};

export default Header;

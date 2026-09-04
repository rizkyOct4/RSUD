import Navbar from "./navbar";
import AuthProvider from "./auth/provider/provider";

export default function MainLayout({
  children,
  auth,
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen max-w-8xl flex-col items-center bg-white font-sans text-white">

      {/* Content */}
      <div className="relative z-100 mx-auto w-full mt-16">
        <AuthProvider>
          <Navbar />
          {auth}
          {children}
        </AuthProvider>
      </div>
    </main>
  );
}

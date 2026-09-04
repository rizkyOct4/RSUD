// import { DashboardContext } from "@/app/context/context";
import DashboardProvider from "./provider/provider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardProvider>{children}</DashboardProvider>;
};

export default Layout;

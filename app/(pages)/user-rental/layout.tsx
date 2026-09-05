import UserCarRentalProvider from "./provider/provider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <UserCarRentalProvider>{children}</UserCarRentalProvider>;
};

export default Layout;

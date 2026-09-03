import UserCarProvider from "./provider/provider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <UserCarProvider>{children}</UserCarProvider>;
};
export default Layout;

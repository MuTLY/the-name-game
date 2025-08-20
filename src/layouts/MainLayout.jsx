import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/header";

const MainLayout = () => {
  const location = useLocation();
  return (
    <>
      {/* Only show Header if not on specific pages */}
      {location.pathname !== "/" &&
        location.pathname !== "/game-over" &&
        location.pathname !== "/error" && <Header />}
      <Outlet />
    </>
  );
};

export default MainLayout;

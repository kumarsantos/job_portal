/** @format */

import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="grid-background"></div>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default AppLayout;

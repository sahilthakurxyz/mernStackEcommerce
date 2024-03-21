import React from "react";
import Footer from "./components/layout/Footer/Footer.js";
import Header from "./components/layout/Header/Header.js";
import NavMenu from "./components/layout/Header/NavMenu.js";

const MainLayout = ({ children }) => {
  return (
    <>
      <span id="navmenu_mainContainer"></span>
      <Header />
      <NavMenu />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;

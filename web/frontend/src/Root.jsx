import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <Outlet />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Root;

import { Fragment } from "react";
import Appbar from "./../common/Appbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Fragment>
      <Appbar />
      <Outlet />
    </Fragment>
  );
};

export default Layout;

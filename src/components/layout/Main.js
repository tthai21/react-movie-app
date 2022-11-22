import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Main = ({ userInfo }) => {
  return (
    <Fragment>
      <Header userInfo={userInfo}></Header>
      <Outlet></Outlet>
    </Fragment>
  );
};

export default Main;

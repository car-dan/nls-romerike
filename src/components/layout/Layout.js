import React from "react";

import classes from "../layout/Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <>
      <div className={classes.container}>{children}</div>
    </>
  );
};

export default Layout;

import React from "react";
import { useContext } from "react";
import NewsApiCall from "../../components/common/NewsapiCall";
import AuthContex from "../../components/contex/AuthContex";
import Heading from "../../components/layout/Heading";

const Nyheter = () => {
  const [auth, setAuth] = useContext(AuthContex);

  return (
    <>
      {auth ? (
        <Heading title="Admin" subtitle="Nyheter" />
      ) : (
        <Heading title="Nyheter" />
      )}
      <NewsApiCall />
    </>
  );
};

export default Nyheter;

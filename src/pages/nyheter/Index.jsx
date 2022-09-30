import React from "react";
import { useContext } from "react";
import NewsApiCall from "../../components/common/NewsapiCall";
import AuthContex from "../../components/contex/AuthContex";

const Nyheter = () => {
  const [auth, setAuth] = useContext(AuthContex);

  return (
    <>
      {auth ? (
        <>
          <div className="breadcrumbs">
            <div className="breadcrumbs_text">
              <h1>Admin</h1>
              <h2>Nyheter</h2>
            </div>
          </div>
        </>
      ) : (
        <div className="breadcrumbs">
          <div className="breadcrumbs_text">
            <h1>Nyheter</h1>
          </div>
        </div>
      )}

      <NewsApiCall />
    </>
  );
};

export default Nyheter;

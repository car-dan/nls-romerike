import React, { useEffect, useState, useContext } from "react";
import AuthContex from "../../components/contex/AuthContex";
import axios from "axios";
import moment from "moment/moment";
import { BASE_URL } from "../../constants/api";

import { Link } from "react-router-dom";

import classes from "../kontakt/Contact.module.scss";

const url = BASE_URL + "/paameldingers";

function SignUpList() {
  const [auth, setAuth] = useContext(AuthContex);
  const [contactInfo, setContactInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function getContactForms() {
      try {
        const response = await axios.get(url);
        let list = response.data.data;
        list.sort((x) => (x.attributes.lest ? 1 : -1));
        setContactInfo(list);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    getContactForms();
  }, []);

  if (loading) return <div>Loading Kurs...</div>;
  if (error) return <div>{}</div>;
  return (
    <>
      <div className="breadcrumbs">
        <div className="breadcrumbs_text">
          <h1>Admin</h1>
          <h2>Påmeldinger</h2>
        </div>
      </div>
      <div className={classes.contactAut}>
        {contactInfo.map((info) => {
          return (
            <div key={info.id} className={classes.contactAut__item}>
              <div className={classes.contactAut__item__status}>
                {info.attributes.lest ? "Lest" : "Ny"}
              </div>
              <div className={classes.contactAut__item__date}>
                {moment(info.attributes.createdAt).format("DD.MM.YY")}
              </div>
              <div className={classes.contactAut__item__name}>
                {info.attributes.navn_foresatte}
              </div>

              <div className={classes.contactAut__item__button}>
                <Link to={"/pamelding/auth/" + info.id}>Vis</Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default SignUpList;

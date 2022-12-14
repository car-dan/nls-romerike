import React, { useEffect, useState, useContext } from "react";
import AuthContex from "../../components/contex/AuthContex";
import axios from "axios";
import { BASE_URL } from "../../constants/api";
import moment from "moment/moment";

import { Link, useParams } from "react-router-dom";

import classes from "./Contact.module.scss";
import Heading from "../../components/layout/Heading";

const url = BASE_URL + "/kontaktskjemas";

function ContactAut() {
  const [auth, setAuth] = useContext(AuthContex);
  const [contactInfo, setContactInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();

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
      <Heading title="Admin" subtitle="Kontakt" />
      <div className={classes.contactAut}>
        {contactInfo.map((info) => {
          return (
            <div key={info.id} className={classes.contactAut__item}>
              <div className={classes.contactAut__item__status}>
                {info.attributes.lest ? "Lest" : "Ny"}
              </div>
              <div className={classes.contactAut__item__date}>
                {moment(info.attributes.dato, "YYYY:MM:DD").format("DD.MM.YY")}
              </div>
              <div className={classes.contactAut__item__name}>
                {info.attributes.navn}
              </div>

              <div className={classes.contactAut__item__button}>
                <Link to={"/kontakt/" + info.id}>Vis</Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ContactAut;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moments from "moment/moment";
import { BASE_URL } from "../../constants/api";

import classes from "../kontakt/Contact.module.scss";

function SignUpAuth() {
  const [pamelding, setPamelding] = useState([]);
  const [buttonText, setButtonText] = useState("Marker Lest");

  let params = useParams();
  let navigate = useNavigate();
  console.log(params.id);
  const url = BASE_URL + `/paameldingers/${params.id}?populate=*`;

  const fetchDetails = async () => {
    const data = await fetch(url);
    const response = await data.json();
    console.log(response.data.attributes);
    setPamelding(response.data.attributes);
  };
  useEffect(() => {
    fetchDetails().catch(console.error);
  }, [params.id]);
  function handleSubmit(e) {
    e.preventDefault();

    let path = "/kurs/pamelding";
    if (pamelding.lest) {
      navigate(path);
    } else {
      setButtonText("Sending...");

      axios
        .put(BASE_URL + `/paameldingers/${params.id}`, {
          data: {
            lest: true,
          },
        })
        .then((response) => {
          console.log(response);
          if (response?.status === 200) {
            setButtonText("Lest");
            setTimeout(function () {
              navigate(path);
            }, 2000);
          } else {
            alert(response?.message);
          }
        });
    }
  }

  console.log(pamelding.poststed);

  return (
    <>
      <div className="breadcrumbs">
        <div className="breadcrumbs_text">
          <h1>Admin</h1>
          <h2>Påmelding</h2>
        </div>
      </div>
      <form>
        <label>Hall</label>
        <input
          className={classes.contactAuthItem__sted}
          value={pamelding.sted}
        ></input>
        <label>Klokke</label>
        <input
          className={classes.contactAuthItem__tid}
          value={
            moments(pamelding.fra_klokka, "HH:mm:ss").format("HH:mm") +
            " - " +
            moments(pamelding.til_klokka, "HH:mm:ss").format("HH:mm")
          }
        ></input>
        <label>Foresatte</label>
        <input
          className={classes.contactAuthItem__navnForesatte}
          value={pamelding.navn_foresatte}
        ></input>
        <label>Email</label>
        <input
          className={classes.contactAuthItem__epost}
          value={pamelding.epost}
        ></input>
        <label>Tlf</label>
        <input
          className={classes.contactAuthItem__tlf}
          value={pamelding.tlf}
        ></input>
        <label>Navn Barn</label>
        <input
          className={classes.contactAuthItem__barnetsNavn}
          value={pamelding.barnets_navn}
        ></input>
        <label>Fødselsdato</label>
        <input
          className={classes.contactAuthItem__barnetsFødselsDato}
          value={moments(pamelding.fodselsdato_barn, "YYYY:MM:DD").format(
            "DD.MM.YY"
          )}
        ></input>
        <label>adresse</label>
        <input
          className={classes.contactAuthItem__adresse}
          value={pamelding.adresse}
        ></input>
        <label>postnr</label>
        <input
          className={classes.contactAuthItem__postnr}
          value={pamelding.postnr}
        ></input>
        <label>poststed</label>
        <input
          className={classes.contactAuthItem__poststed}
          value={pamelding.poststed}
        ></input>
        <label>Kommentar</label>
        <input
          className={classes.contactAuthItem__kommentar}
          value={pamelding.kommentar}
        ></input>
        <button onClick={handleSubmit}>{buttonText}</button>
      </form>
    </>
  );
}

export default SignUpAuth;

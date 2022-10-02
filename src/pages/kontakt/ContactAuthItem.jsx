import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/api";
import classes from "./Contact.module.scss";
import Heading from "../../components/layout/Heading";

function ContactAuthItem() {
  const [contact, setContact] = useState([]);
  const [buttonText, setButtonText] = useState("Marker Lest");

  let params = useParams();
  let navigate = useNavigate();
  const url = BASE_URL + `/kontaktskjemas/${params.id}?populate=*`;

  const fetchDetails = async () => {
    const data = await fetch(url);
    const response = await data.json();
    setContact(response.data.attributes);
  };

  useEffect(() => {
    fetchDetails().catch(console.error);
  }, [params.id]);

  function handleSubmit(e) {
    e.preventDefault();
    let path = "/kontakt/auth";
    if (contact.lest) {
      navigate(path);
    } else {
      setButtonText("Sending...");
      axios
        .put(BASE_URL + `/kontaktskjemas/${params.id}`, {
          data: {
            lest: true,
          },
        })
        .then((response) => {
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

  return (
    <>
      <Heading title="Admin" subtitle="Kontakt" />
      <form>
        <input
          className={classes.contactAuthItem__navn}
          value={contact.navn}
        ></input>
        <input
          className={classes.contactAuthItem__epost}
          value={contact.epost}
        ></input>
        <input
          className={classes.contactAuthItem__tlf}
          value={contact.telefonnr}
        ></input>
        <input
          className={classes.contactAuthItem__info}
          value={contact.tekst}
        ></input>
        <button onClick={handleSubmit}>{buttonText}</button>
      </form>
    </>
  );
}

export default ContactAuthItem;

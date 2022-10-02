import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL } from "../../constants/api";
import { useState } from "react";
import axios from "axios";
import moment from "moment/moment";

import classes from "./Contact.module.scss";
import Heading from "../../components/layout/Heading";

const initialValues = {
  navn: "navn",
  epost: "epost",
  phone: "tlf",
  kommentar: "kommentar",
};

const schema = yup.object().shape({
  navn: yup.string().required("Fyll inn navn"),
  epost: yup.string().email().required("Fyll inn en gyldig email"),
  phone: yup.string().required("Fyll inn tlf number").min(8),
  kommentar: yup.string().required("Fyll inn her"),
});

const url = BASE_URL + "/kontaktskjemas";

function Kontakt(data) {
  const [formValues, setFormValues] = useState(initialValues);
  const [buttonText, setButtonText] = useState("Send");
  const today = moment().toISOString(new Date());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function OnSubmit(data) {
    setButtonText("Send?");
    setFormValues(data);

    axios
      .post(url, {
        data: {
          navn: formValues.navn,
          epost: formValues.epost,
          telefonnr: formValues.phone,
          tekst: formValues.kommentar,
          dato: today,
        },
      })
      .then((response) => {
        if (response?.status === 200) {
          setButtonText("Sendt");
          setFormValues(initialValues);
        } else {
          alert(response?.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Heading title="Kontak oss" />
      <div className={classes.contact_info}>
        <table>
          <tbody>
            <tr>
              <th>Telefon:</th>
              <th>63 81 06 46</th>
            </tr>
            <tr>
              <th>E-post:</th>
              <th>kontor@nls-romerike.no</th>
            </tr>
            <tr>
              <th>Kontortider: </th>
              <th>Mandag-Torsdag: 10:00-15.00</th>
            </tr>
          </tbody>
        </table>
      </div>

      <form onSubmit={handleSubmit(OnSubmit)}>
        <h2>Eller send oss en melding her:</h2>
        <label />
        <input {...register("navn")} placeholder={formValues.navn} />
        {errors.navn && <span>{errors.navn.message}</span>}
        <label />
        <input {...register("epost")} placeholder={formValues.epost} />
        {errors.epost && <span>{errors.epost.message}</span>}
        <label />
        <input {...register("phone")} placeholder={formValues.phone} />
        {errors.phone && <span>{errors.phone.message}</span>}
        <textarea
          {...register("kommentar")}
          placeholder={formValues.kommentar}
        />
        {errors.kommentar && <span>{errors.kommentar.message}</span>}
        <button>{buttonText}</button>
      </form>
    </>
  );
}

export default Kontakt;

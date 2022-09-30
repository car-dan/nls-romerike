import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL } from "../../constants/api";
import { isValid } from "date-fns";
import { useState } from "react";

import classes from "./Contact.module.scss";

const schema = yup.object().shape({
  navn: yup.string().required("Fyll inn navn").min(3, "minimum 3 bokstaver"),
  epost: yup.string().email().required("Fyll inn en gyldig email"),
  phone: yup.string().required("Fyll inn tlf number").min(8),
  kommentar: yup.string().required("Fyll inn her"),
});

function Kontakt(data) {
  const initialValues = {
    navn: "",
    epost: "",
    phone: "",
    kommentar: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function OnSubmit(data) {
    const url = BASE_URL + "/kontaktskjemas";
    setFormValues(data);
    console.log(data);

    if (isValid) {
      console.log("juppi");

      const apiData = JSON.stringify({
        data: {
          navn: formValues.navn,
          epost: formValues.epost,
          tlf: formValues.phone,
          // kommentar: formValues.kommentar,
        },
      });

      const option = {
        method: "POST",
        body: apiData,
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await fetch(url, option);
        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <div className="breadcrumbs">
        <div className="breadcrumbs_text">
          <h1>Kontak oss</h1>
        </div>
      </div>
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
        <input {...register("navn")} placeholder="Navn" />
        {errors.navn && <span>{errors.navn.message}</span>}
        <input {...register("epost")} placeholder="Email" />
        {errors.epost && <span>{errors.epost.message}</span>}
        <input {...register("phone")} placeholder="Telefonnr" />
        {errors.phone && <span>{errors.phone.message}</span>}
        <textarea {...register("kommentar")} placeholder="Kommentar" />
        {errors.kommentar && <span>{errors.kommentar.message}</span>}
        <button>Send</button>
      </form>
    </>
  );
}

export default Kontakt;

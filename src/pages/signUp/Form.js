import React from "react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./SignUp.module.scss";
import { isValid } from "date-fns";
import { useState } from "react";
import moment from "moment/moment";
import { parse } from "date-fns";
import { BASE_URL } from "../../constants/api";

const schema = yup.object().shape({
  navnForesatte: yup
    .string()
    .required("Fyll inn navn på foresatte")
    .min(3, "minimum 3 bokstaver"),
  epost: yup.string().email().required("Fyll inn en gyldig email"),
  phone: yup.string().required("Fyll inn tlf number").min(8),
  barnFodselsdato: yup.date(),
  navnBarn: yup
    .string()
    .required("Fyll in navn på barnet")
    .min(3, "minimum 3 bokstaver"),
  adresse: yup
    .string()
    .required("Adresse")
    .min(3, "Fyll inn en gyldig adresse"),
  postNr: yup
    .number()
    .required("Fyll inn en gyldig postnumber")
    .min(4, "minimum 4 tall"),
  postSted: yup.string().required("Post sted").min(3, "minimum 3 bokstaver"),
  kommentar: yup.string(),
});

function ContactForm(props) {
  const initialValues = {
    navnForesatte: "",
    epost: "",
    phone: "",
    barnFodselsdato: "",
    navnBarn: "",
    adresse: "",
    postNr: "",
    postSted: "",
    kommentar: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const kursType = "Kurs: " + props.type;
  const kursSted = props.kurs;
  const startTid = props.startTime;
  const sluttTid = props.endTime;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function OnSubmit(data) {
    const url = BASE_URL + "/paameldingers";
    setFormValues(data);
    console.log(data);
    console.log(formValues.barnFodselsdato);
    const bday = moment(formValues.barnFodselsdato).utc().format("YYYY-MM-DD");

    if (isValid) {
      console.log("juppi");

      const apiData = JSON.stringify({
        data: {
          sted: kursSted,
          fra_klokka: startTid + ":00.000",
          til_klokka: sluttTid + ":00.000",
          navn_foresatte: formValues.navnForesatte,
          epost: formValues.epost,
          tlf: formValues.phone,
          fodselsdato_barn: bday,
          barnets_navn: formValues.navnBarn,
          adresse: formValues.adresse,
          postnr: formValues.postNr,
          poststed: formValues.postSted,
          kommentar: kursType + "lsdaljkgøljkasjkglødjkl",
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
      <div className="choosenKurs">
        <div className="choosenKurs__info">
          <div>{props.kurs}</div>
          <div>{props.type}</div>
        </div>
        <div className="choosenKurs__time">
          <h2>
            {props.startTime}-{props.endTime}
          </h2>
        </div>
      </div>
      <form onSubmit={handleSubmit(OnSubmit)}>
        <input {...register("navnForesatte")} placeholder="Navn Foresatte" />
        {errors.navnForesatte && <span>{errors.navnForesatte.message}</span>}
        <input {...register("epost")} placeholder="Email" />
        {errors.epost && <span>{errors.epost.message}</span>}
        <input {...register("phone")} placeholder="Telefonnr" />
        {errors.phone && <span>{errors.phone.message}</span>}
        <input {...register("navnBarn")} placeholder="Barnets navn" />
        {errors.navnBarn && <span>{errors.navnBarn.message}</span>}
        <input {...register("barnFodselsdato")} placeholder="MM.DD.YYYY" />
        {errors.barnFodselsdato && (
          <span>{errors.barnFodselsdato.message}</span>
        )}
        <input {...register("adresse")} placeholder="Adresse" />
        {errors.adresse && <span>{errors.adresse.message}</span>}
        <input {...register("postNr")} placeholder="Post Nr" />
        {errors.postNr && <span>{errors.postNr.message}</span>}
        <input {...register("postSted")} placeholder="Post Sted" />
        {errors.postSted && <span>{errors.postSted.message}</span>}

        <textarea {...register("kommentar")} placeholder="Kommentar" />
        {errors.kommentar && <span>{errors.kommentar.message}</span>}
        <button>Send</button>
      </form>
    </>
  );
}

export default ContactForm;

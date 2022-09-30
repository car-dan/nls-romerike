import React, { useState } from "react";
import axios from "axios";

import { BASE_URL } from "../../constants/api";

function AddKursNew() {
  const [sted, setSted] = useState(" ");
  const [type, setType] = useState(" ");
  const [startDato, setStartDato] = useState(" ");
  const [sluttDato, setSluttDato] = useState(" ");
  const [startTid, setStartTid] = useState(" ");
  const [sluttTid, setSluttTid] = useState(" ");
  const [paamelte, setPaamelte] = useState(" ");
  const [plasser, setPlasser] = useState(" ");
  const [pris, setPris] = useState(" ");
  const [instruktor, setInstruktor] = useState(" ");
  const [niva, setNiva] = useState(" ");
  const [buttonText, setButtonText] = useState("Send");

  const url = BASE_URL + `/kurs`;

  const handleChange = (event) => {
    if (event.target.name === "sted") {
      setSted(event.target.value);
    } else if (event.target.name === "type") {
      setType(event.target.value);
    } else if (event.target.name === "niva") {
      setNiva(event.target.value);
    } else if (event.target.name === "startDato") {
      setStartDato(event.target.value);
    } else if (event.target.name === "sluttDato") {
      setSluttDato(event.target.value);
    } else if (event.target.name === "startTid") {
      setStartTid(event.target.value);
    } else if (event.target.name === "sluttTid") {
      setSluttTid(event.target.value);
    } else if (event.target.name === "paamelte") {
      setPaamelte(event.target.value);
    } else if (event.target.name === "plasser") {
      setPlasser(event.target.value);
    } else if (event.target.name === "pris") {
      setPris(event.target.value);
    } else if (event.target.name === "instruktoer") {
      setInstruktor(event.target.value);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    setButtonText("Sending...");
    const fult = paamelte === plasser;

    axios
      .post(url, {
        data: {
          sted: sted,
          Type_kurs: type,
          instruktoer: instruktor,
          niva: niva,
          paamelde: paamelte,
          pris: pris,
          slutt_dato: sluttDato,
          slutt_tid: sluttTid + ":00",
          start_dato: startDato,
          start_tid: startTid + ":00",
          sted: sted,
          totalt_plasser: plasser,
          fult: fult,
        },
      })
      .then((response) => {
        console.log(response);
        if (response?.status === 200) {
          setButtonText("Sendt");
          setTimeout(function () {
            setButtonText("Oppdatert");
            setSted("");
            setType("");
            setNiva("");
            setInstruktor("");
            setPris("");
            setPaamelte("");
            setPlasser("");
            setSluttDato("");
            setStartDato("");
            setSluttTid("");
            setStartTid("");
          }, 2000);
        } else {
          alert(response?.message);
        }
      });
  }

  return (
    <>
      <div className="breadcrumbs">
        <div className="breadcrumbs_text">
          <h1>Admin</h1>
          <h2>Kurs</h2>
        </div>
      </div>
      <form>
        <label>Sted </label>
        <input type="text" name="sted" value={sted} onChange={handleChange} />
        <label>Kurs </label>
        <input type="text" name="type" value={type} onChange={handleChange} />
        <label>Nivå </label>
        <input type="text" name="niva" value={niva} onClick={handleChange} />
        <label>Start dato </label>
        <input
          type="date"
          name="startDato"
          value={startDato}
          onChange={handleChange}
        />
        <label>Slutt dato </label>
        <input
          type="date"
          name="sluttDato"
          value={sluttDato}
          onChange={handleChange}
        />
        <label>Start tid </label>
        <input
          type="time"
          name="startTid"
          value={startTid}
          onChange={handleChange}
        />
        <label>Slutt tid </label>
        <input
          type="time"
          name="sluttTid"
          value={sluttTid}
          onChange={handleChange}
        />
        <label>Påmeldte </label>
        <input
          type="number"
          name="paamelte"
          value={paamelte}
          onChange={handleChange}
        />
        <label>Antall plasser </label>
        <input
          type="number"
          name="plasser"
          value={plasser}
          onChange={handleChange}
        />
        <label>Pris </label>
        <input type="number" name="pris" value={pris} onChange={handleChange} />
        <label>Innstruktør </label>
        <input
          type="text"
          name="instruktoer"
          value={instruktor}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>{buttonText}</button>
      </form>
      <div className="article"></div>
    </>
  );
}

export default AddKursNew;

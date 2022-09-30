import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../constants/api";

function AddKursSpecific() {
  const [sted, setSted] = useState();
  const [type, setType] = useState();
  const [startDato, setStartDato] = useState();
  const [sluttDato, setSluttDato] = useState();
  const [startTid, setStartTid] = useState();
  const [sluttTid, setSluttTid] = useState();
  const [paamelte, setPaamelte] = useState();
  const [plasser, setPlasser] = useState();
  const [pris, setPris] = useState();
  const [instruktor, setInstruktor] = useState();
  const [niva, setNiva] = useState();
  const [buttonText, setButtonText] = useState("Oppdater");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();

  const url = BASE_URL + `/kurs/${params.id}`;

  useEffect(
    function () {
      async function getArticle() {
        try {
          const respons = await axios.get(url);
          console.log(respons);
          setSted(respons.data.data.attributes.sted);
          setType(respons.data.data.attributes.Type_kurs);
          setNiva(respons.data.data.attributes.niva);
          setStartDato(respons.data.data.attributes.start_dato);
          setSluttDato(respons.data.data.attributes.slutt_dato);
          setStartTid(respons.data.data.attributes.start_tid);
          setSluttTid(respons.data.data.attributes.slutt_tid);
          setPaamelte(respons.data.data.attributes.paamelde);
          setPlasser(respons.data.data.attributes.totalt_plasser);
          setPris(respons.data.data.attributes.pris);
          setInstruktor(respons.data.data.attributes.instruktoer);
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      getArticle();
    },
    [params.id]
  );

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
      console.log(startTid);
      setStartTid(event.target.value);
    } else if (event.target.name === "sluttTid") {
      setSluttTid(event.target.value);
    } else if (event.target.name === "paamelte") {
      setPaamelte(event.target.value);
    } else if (event.target.name === "plasser") {
      setPlasser(event.target.value);
    } else if (event.target.name === "pris") {
      setInstruktor(event.target.value);
    } else if (event.target.name === "instruktoer") {
      setNiva(event.target.value);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    setButtonText("Sending...");
    const fult = paamelte === plasser;

    axios
      .put(url, {
        data: {
          sted: sted,
          Type_kurs: type,
          niva: niva,
          start_dato: startDato,
          slutt_dato: sluttDato,
          start_tid: startTid,
          slutt_tid: sluttTid,
          pris: pris,
          paamelde: paamelte,
          totalt_plasser: plasser,
          instruktoer: instruktor,
          fult: fult,
        },
      })
      .then((response) => {
        console.log(response);
        if (response?.status === 200) {
          setButtonText("Sendt");
          setTimeout(function () {
            setButtonText("Oppdater");
          }, 2000);
        } else {
          alert(response?.message);
        }
      });
  }

  if (loading) return <div>Laster artikkel...</div>;
  if (error) return <div>Vennligs prøv igjen senere</div>;

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
        <input
          type="text"
          name="sted"
          defaultValue={sted}
          onChange={handleChange}
        />
        <label>Kurs </label>
        <input
          type="text"
          name="type"
          onChange={handleChange}
          defaultValue={type}
        />
        <label>Nivå </label>
        <input
          type="text"
          name="niva"
          defaultValue={niva}
          onChange={handleChange}
        />
        <label>Start dato </label>
        <input
          type="date"
          name="startDato"
          onChange={handleChange}
          defaultValue={startDato}
        />
        <label>Slutt dato </label>
        <input
          type="date"
          name="sluttDato"
          onChange={handleChange}
          defaultValue={sluttDato}
        />
        <label>Start tid </label>
        <input
          type="time"
          name="startTid"
          onChange={handleChange}
          defaultValue={startTid}
        />
        <label>Slutt tid </label>
        <input
          type="time"
          name="sluttTid"
          onChange={handleChange}
          defaultValue={sluttTid}
        />
        <label>Påmeldte </label>
        <input
          type="number"
          name="paamelte"
          onChange={handleChange}
          defaultValue={paamelte}
        />
        <label>Antall plasser </label>
        <input
          type="number"
          name="plasser"
          onChange={handleChange}
          defaultValue={plasser}
        />
        <label>Pris </label>
        <input type="number" name="pris" defaultValue={pris} />
        <label>Innstruktør </label>
        <input
          type="text"
          name="instruktoer"
          onChange={handleChange}
          defaultValue={instruktor}
        />
        <button onClick={handleSubmit}>{buttonText}</button>
      </form>
      <div className="article"></div>
    </>
  );
}

export default AddKursSpecific;
